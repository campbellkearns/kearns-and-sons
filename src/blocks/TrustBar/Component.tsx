import type { TrustBarBlock as TrustBarBlockProps } from '@/payload-types'
import React from 'react'

export const TrustBarBlock: React.FC<TrustBarBlockProps> = ({ items }) => {
  if (!items?.length) return null

  return (
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-12 border-y border-border">
        {items.map(({ label, detail, id }) => (
          <div key={id ?? label} className="flex flex-col items-center text-center gap-1">
            <p className="font-semibold">{label}</p>
            <p className="text-sm text-muted-foreground">{detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
