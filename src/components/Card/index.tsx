'use client'
import { Badge } from '@/components/ui/badge'
import { Logo } from '@/components/Logo/Logo'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Memorial, Post } from '@/payload-types'

export type CardMemorialData = Pick<
  Memorial,
  'slug' | 'categories' | 'meta' | 'title' | 'serviceDetails' | 'publishedAt'
>
export type CardPostData = Pick<
  Post,
  'slug' | 'categories' | 'meta' | 'title' | 'publishedAt' | 'populatedAuthors'
>
export type CardData = CardMemorialData | CardPostData

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(
    new Date(iso),
  )

const ImagePlaceholder: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={cn(
      'w-full h-full flex items-center justify-center bg-primary min-h-[200px]',
      className,
    )}
    aria-hidden="true"
  >
    <Logo className="w-14 opacity-20" />
  </div>
)

const MemorialCard: React.FC<{
  doc: CardMemorialData
  linkRef: React.Ref<HTMLAnchorElement>
}> = ({ doc, linkRef }) => {
  const { slug, meta, title, serviceDetails } = doc
  const { description, image: metaImage } = meta || {}
  const href = `/memorials/${slug}`

  const showServiceDate =
    serviceDetails?.serviceDateTime && !serviceDetails?.pending

  return (
    <article className="group border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer flex flex-col md:flex-row md:items-stretch transition-shadow hover:shadow-md">
      {/* Image pane */}
      <div className="md:w-2/5 relative shrink-0 overflow-hidden">
        {metaImage && typeof metaImage !== 'string' ? (
          <Media
            resource={metaImage}
            size="(max-width: 768px) 100vw, 50vw"
            imgClassName="object-cover w-full h-full"
            className="h-full"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>

      {/* Content pane */}
      <div className="flex flex-col justify-center gap-3 p-6 border-l-2 border-accent">
        {title && (
          <h3 className="font-heading text-xl font-normal leading-snug">
            <Link
              className="text-foreground hover:text-foreground/80 transition-colors"
              href={href}
              ref={linkRef}
            >
              {title}
            </Link>
          </h3>
        )}

        {showServiceDate && (
          <p className="font-body text-sm italic text-label">
            Service: {formatDate(serviceDetails!.serviceDateTime!)}
          </p>
        )}

        {description && (
          <p className="font-body text-base text-muted-foreground line-clamp-3">
            {description.replace(/\s/g, ' ')}
          </p>
        )}
      </div>
    </article>
  )
}

const PostCard: React.FC<{
  doc: CardPostData
  linkRef: React.Ref<HTMLAnchorElement>
}> = ({ doc, linkRef }) => {
  const { slug, categories, meta, title, publishedAt, populatedAuthors } = doc
  const { description, image: metaImage } = meta || {}
  const href = `/posts/${slug}`

  const hasCategories = Array.isArray(categories) && categories.length > 0
  const authorName =
    Array.isArray(populatedAuthors) && populatedAuthors.length > 0
      ? populatedAuthors[0]?.name
      : null

  return (
    <article className="group border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer flex flex-col h-full transition-shadow hover:shadow-md">
      {/* Image pane */}
      <div className="relative overflow-hidden aspect-video">
        {metaImage && typeof metaImage !== 'string' ? (
          <Media
            resource={metaImage}
            size="(max-width: 768px) 100vw, 33vw"
            imgClassName="object-cover w-full h-full"
          />

        ) : (
          <ImagePlaceholder />
        )}
      </div>

      {/* Content pane */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {hasCategories && (
          <div className="flex flex-wrap gap-2">
            {categories!.map((category, index) => {
              if (typeof category === 'object') {
                return (
                  <Badge key={index} variant="subtle">
                    {category.title || 'Untitled'}
                  </Badge>
                )
              }
              return null
            })}
          </div>
        )}

        {title && (
          <h3 className="font-heading text-lg font-normal leading-snug">
            <Link
              className="text-foreground hover:text-foreground/80 transition-colors"
              href={href}
              ref={linkRef}
            >
              {title}
            </Link>
          </h3>
        )}

        <div className="flex items-center gap-2 font-body text-sm text-label flex-wrap">
          {authorName && <span>{authorName}</span>}
          {authorName && publishedAt && <span aria-hidden="true">·</span>}
          {publishedAt && <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>}
        </div>

        {description && (
          <p className="font-body text-sm text-muted-foreground line-clamp-3 mt-auto">
            {description.replace(/\s/g, ' ')}
          </p>
        )}
      </div>
    </article>
  )
}

export const Card: React.FC<{
  className?: string
  doc?: CardData
  relationTo?: 'posts' | 'memorials'
  variant: 'memorial' | 'post'
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, variant } = props

  if (!doc) return null

  return (
    <div className={cn('hover:cursor-pointer', className)} ref={card.ref}>
      {variant === 'memorial' ? (
        <MemorialCard doc={doc as CardMemorialData} linkRef={link.ref} />
      ) : (
        <PostCard doc={doc as CardPostData} linkRef={link.ref} />
      )}
    </div>
  )
}
