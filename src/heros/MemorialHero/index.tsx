'use client'
import { Badge } from '@/components/ui/badge'
import { Media } from '@/components/Media'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import type { Memorial } from '@/payload-types'
import React, { useEffect } from 'react'

type Props = {
  title: string
  heroImage?: Memorial['heroImage']
  dateOfBirth?: string | null
  dateOfPassing?: string | null
  dateOfService?: string | null
  categories?: Memorial['categories']
}

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso))

const GoldLine: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={`h-px bg-accent mx-auto motion-safe:animate-[fadeIn_1s_ease-out_0.3s_both] ${className ?? 'w-16'}`}
    aria-hidden="true"
  />
)

export const MemorialHero: React.FC<Props> = ({
  title,
  heroImage,
  dateOfBirth,
  dateOfPassing,
  dateOfService,
  categories,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  const hasImage = heroImage && typeof heroImage !== 'string'
  const hasCategories = Array.isArray(categories) && categories.length > 0
  const hasDates = dateOfBirth || dateOfPassing || dateOfService

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center min-h-[80vh] overflow-hidden"
      data-theme="dark"
    >
      {/* Background */}
      {hasImage ? (
        <Media
          fill
          priority
          imgClassName="-z-10 object-cover"
          resource={heroImage}
        />
      ) : (
        <div className="absolute inset-0 -z-10 bg-primary" aria-hidden="true" />
      )}

      {/* Overlay gradient */}
      <div
        className="absolute inset-0 -z-[5] bg-gradient-to-t from-black/80 via-black/50 to-black/20"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container relative z-10 flex flex-col items-center text-center px-6 pt-40 pb-20">
        {/* Categories */}
        {hasCategories && (
          <div className="flex flex-wrap gap-2 justify-center mb-8 motion-safe:animate-[fadeIn_0.8s_ease-out_0.1s_both]">
            {categories!.map((category, i) => {
              if (typeof category === 'object' && category !== null) {
                return (
                  <Badge key={i} variant="subtle">
                    {category.title || 'Untitled'}
                  </Badge>
                )
              }
              return null
            })}
          </div>
        )}

        {/* Top gold line */}
        <GoldLine className="w-12 mb-8" />

        {/* Name */}
        <h1 className="font-heading font-normal text-white leading-[1.05] tracking-wide motion-safe:animate-[fadeIn_1s_ease-out_0.3s_both]"
          style={{ fontSize: 'var(--text-display)' }}
        >
          {title}
        </h1>

        {/* Bottom gold line */}
        <GoldLine className="w-12 mt-8 mb-8" />

        {/* Dates */}
        {hasDates && (
          <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center font-body text-lg italic text-white/80 motion-safe:animate-[fadeIn_0.8s_ease-out_0.7s_both]">
            {dateOfBirth && (
              <span>
                Born{' '}
                <time dateTime={dateOfBirth}>{formatDate(dateOfBirth)}</time>
              </span>
            )}
            {dateOfPassing && (
              <span>
                Passed{' '}
                <time dateTime={dateOfPassing}>{formatDate(dateOfPassing)}</time>
              </span>
            )}
            {dateOfService && (
              <span>
                Service{' '}
                <time dateTime={dateOfService}>{formatDate(dateOfService)}</time>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
