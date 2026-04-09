import type { Metadata } from 'next/types'
import type { Where } from 'payload'

import { CollectionArchive } from '@/components/CollectionArchive'
import { ArchiveFilterBar } from '@/components/ArchiveFilterBar'
import { SearchParamPagination } from '@/components/Pagination/SearchParamPagination'
import { PageRange } from '@/components/PageRange'
import { LowImpactHero } from '@/heros/LowImpact'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

const MONTH_NAMES = [
  '',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; month?: string; year?: string; page?: string }>
}) {
  const { name = '', month = '', year = '', page: pageParam = '1' } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam, 10) || 1)

  const payload = await getPayload({ config: configPromise })

  const where: Where = {}

  if (name) {
    where.title = { like: name }
  }

  if (year) {
    const y = parseInt(year, 10)
    const m = month ? parseInt(month, 10) - 1 : 0
    const start = new Date(y, m, 1)
    const end = month
      ? new Date(y, parseInt(month, 10), 0, 23, 59, 59) // last day of the given month
      : new Date(y, 11, 31, 23, 59, 59) // last day of the year
    where.publishedAt = {
      greater_than_equal: start.toISOString(),
      less_than_equal: end.toISOString(),
    }
  }

  const memorials = await payload.find({
    collection: 'memorials',
    depth: 1,
    limit: 12,
    page: currentPage,
    overrideAccess: false,
    ...(Object.keys(where).length > 0 && { where }),
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      serviceDetails: true,
      publishedAt: true,
    },
  })

  const hasFilters = Boolean(name || month || year)

  // Build a human-readable description of the active filters for the empty state
  const filterDescription = [
    name ? `"${name}"` : '',
    month && year ? `${MONTH_NAMES[parseInt(month, 10)]} ${year}` : year || '',
  ]
    .filter(Boolean)
    .join(' in ')

  return (
    <div className="pb-24">
      <PageClient />

      <LowImpactHero>
        <h1 className="font-heading text-3xl leading-snug">Memorials</h1>
      </LowImpactHero>

      <ArchiveFilterBar
        initialValues={{ name, month, year }}
        searchPlaceholder="Search by name…"
      />

      <div className="container mb-8 mt-6">
        <PageRange
          collection="memorials"
          currentPage={memorials.page}
          limit={12}
          totalDocs={memorials.totalDocs}
        />
      </div>

      {hasFilters && memorials.totalDocs === 0 ? (
        <div className="container py-16 text-center">
          <p className="text-muted-foreground">
            No memorials found{filterDescription ? ` for ${filterDescription}` : ''}.{' '}
            Try a different search.
          </p>
        </div>
      ) : (
        <CollectionArchive posts={memorials.docs} relationTo="memorials" />
      )}

      <div className="container">
        {memorials.totalPages > 1 && memorials.page && (
          <SearchParamPagination page={memorials.page} totalPages={memorials.totalPages} />
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
