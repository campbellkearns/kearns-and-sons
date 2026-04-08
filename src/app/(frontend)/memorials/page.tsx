import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { LowImpactHero } from '@/heros/LowImpact'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const memorials = await payload.find({
    collection: 'memorials',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      serviceDetails: true,
      publishedAt: true,
    },
  })

  return (
    <div className="pb-24">
      <PageClient />

      <LowImpactHero>
        <h1 className="font-heading text-3xl leading-snug">Memorials</h1>
      </LowImpactHero>

      {/* TODO: filter bar — name, date range, category (DEV-21) */}
      <div aria-hidden="true" />

      <div className="container mb-8">
        <PageRange
          collection="memorials"
          currentPage={memorials.page}
          limit={12}
          totalDocs={memorials.totalDocs}
        />
      </div>

      <CollectionArchive posts={memorials.docs} relationTo="memorials" />

      <div className="container">
        {memorials.totalPages > 1 && memorials.page && (
          <Pagination page={memorials.page} totalPages={memorials.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Memorials | ${process.env.NEXT_PUBLIC_SITE_TITLE ? process.env.NEXT_PUBLIC_SITE_TITLE : 'Funeral Home'}`,
  }
}
