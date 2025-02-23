import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Memorial } from '../../../payload-types'

export const revalidateMemorial: CollectionAfterChangeHook<Memorial> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/memorials/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag('memorials-sitemap')
    }

    // If the memorial was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/memorials/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('memorials-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Memorial> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/memorials/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('memorials-sitemap')
  }

  return doc
}
