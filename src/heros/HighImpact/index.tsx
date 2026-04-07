'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  const hasImage = media && typeof media === 'object'

  return (
    <div
      className="relative -mt-[5.2rem] flex items-center justify-center min-h-[80vh] overflow-hidden"
      data-theme="dark"
    >
      {/* Background image */}
      {hasImage ? (
        <Media fill priority imgClassName="-z-10 object-cover" resource={media} />
      ) : (
        <div className="absolute inset-0 -z-10 bg-primary" aria-hidden="true" />
      )}

      {/* Gradient overlay for legibility */}
      <div
        className="absolute inset-0 -z-[5] bg-gradient-to-t from-black/80 via-black/50 to-black/20"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container relative z-10 flex flex-col items-center text-center py-32 px-6">
        {richText && (
          <div className="[&_h1]:text-display [&_h2]:text-display [&_h1]:font-normal [&_h2]:font-normal [&_h1]:tracking-wide [&_h2]:tracking-wide mb-8 max-w-[48rem]">
            <RichText className="text-white" data={richText} enableGutter={false} />
          </div>
        )}
        {Array.isArray(links) && links.length > 0 && (
          <ul
            className="flex flex-wrap justify-center gap-4 text-white"
            style={{ '--border': '0 0% 100%' } as React.CSSProperties}
          >
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
