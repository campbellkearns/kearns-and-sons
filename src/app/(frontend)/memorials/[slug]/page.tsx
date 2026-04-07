import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Memorial } from '@/payload-types'

import { MemorialHero } from '@/heros/MemorialHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Condolences } from '@/components/Condolences'
import { ServiceDetails } from '@/components/ServiceDetails'
import { SectionDivider } from '@/components/ui/section-divider'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const memorials = await payload.find({
    collection: 'memorials',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = memorials.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Memorial({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/memorials/' + slug
  const memorial = await queryMemorialBySlug({ slug })

  if (!memorial) return <PayloadRedirects url={url} />

  const hasContent = (memorial.content?.root?.children?.length ?? 0) > 0

  return (
    <main id="main-content" className="pt-16 pb-24">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <MemorialHero
        title={memorial.title}
        heroImage={memorial.heroImage}
        dateOfService={
          memorial.serviceDetails?.pending
            ? null
            : memorial.serviceDetails?.serviceDateTime ?? null
        }
        categories={memorial.categories}
      />

      <div className="container">
        <div className="max-w-[48rem] mx-auto px-4">
          {hasContent && (
            <RichText className="mt-16" data={memorial.content} enableGutter={false} />
          )}

          <SectionDivider className="my-12" />

          <ServiceDetails serviceDetails={memorial.serviceDetails} />

          <SectionDivider className="my-12" />

          <Condolences relationID={memorial.id} subjectName={memorial.title} />
        </div>
      </div>
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const memorial = await queryMemorialBySlug({ slug })

  return generateMeta({ doc: memorial })
}

const queryMemorialBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'memorials',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
