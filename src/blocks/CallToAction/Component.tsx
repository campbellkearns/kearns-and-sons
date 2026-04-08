import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { SectionDivider } from '@/components/ui/section-divider'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="container my-8">
      <SectionDivider className="mb-10" />
      <div className="bg-accent/10 border-y border-accent/30 py-12 px-6 md:px-10 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="max-w-[36rem]">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-4 shrink-0">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </div>
      <SectionDivider className="mt-10" />
    </div>
  )
}
