import type { Post, Memorial, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, relationTo, selectedDocs } = props

  const limit = limitFromProps || 3
  const collection = relationTo || 'posts'

  let docs: (Post | Memorial)[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const whereClause =
      flattenedCategories && flattenedCategories.length > 0
        ? { where: { categories: { in: flattenedCategories } } }
        : {}

    if (collection === 'memorials') {
      const fetched = await payload.find({
        collection: 'memorials',
        depth: 1,
        limit,
        select: {
          title: true,
          slug: true,
          categories: true,
          meta: true,
          serviceDetails: true,
          publishedAt: true,
        },
        ...whereClause,
      })
      docs = fetched.docs
    } else {
      const fetched = await payload.find({
        collection: 'posts',
        depth: 1,
        limit,
        select: {
          title: true,
          slug: true,
          categories: true,
          meta: true,
          publishedAt: true,
          populatedAuthors: true,
        },
        ...whereClause,
      })
      docs = fetched.docs
    }
  } else {
    if (selectedDocs?.length) {
      docs = selectedDocs.map((doc) => {
        if (typeof doc.value === 'object') return doc.value
      }) as Post[]
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ml-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={docs} relationTo={collection === 'memorials' ? 'memorials' : 'posts'} />
    </div>
  )
}
