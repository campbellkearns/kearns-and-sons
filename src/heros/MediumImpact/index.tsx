import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const hasImage = media && typeof media === 'object'

  return (
    <div className="relative min-h-[50vh] flex items-center overflow-hidden">
      {/* Background image */}
      {hasImage ? (
        <Media fill priority imgClassName="-z-10 object-cover" resource={media} />
      ) : (
        <div className="absolute inset-0 -z-10 bg-primary" aria-hidden="true" />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 -z-[5] bg-gradient-to-b from-black/30 to-black/65"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container relative z-10 py-20" data-theme="dark">
        <div className="max-w-[36rem]">
          {richText && (
            <div className="[&_h1]:text-4xl [&_h2]:text-4xl [&_h1]:font-normal [&_h2]:font-normal mb-6">
              <RichText data={richText} enableGutter={false} />
            </div>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
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
    </div>
  )
}
