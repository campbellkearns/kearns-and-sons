import type { ContactInfoBlock as ContactInfoBlockProps } from '@/payload-types'
import React from 'react'

export const ContactInfoBlock: React.FC<ContactInfoBlockProps> = ({
  phone,
  address,
  hours,
  googleMapsEmbedUrl,
}) => {
  return (
    <div className="container lg:max-w-[48rem]">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
        {phone && (
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Phone</p>
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="text-lg font-medium hover:underline"
              aria-label={`Call us at ${phone}`}
            >
              {phone}
            </a>
          </div>
        )}
        {address && (
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Address</p>
            <address className="not-italic text-base whitespace-pre-line">{address}</address>
          </div>
        )}
        {hours && (
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Hours</p>
            <p className="text-base whitespace-pre-line">{hours}</p>
          </div>
        )}
      </div>
      {googleMapsEmbedUrl && (
        <div className="mb-10 rounded-lg overflow-hidden border border-border aspect-video">
          <iframe
            src={googleMapsEmbedUrl}
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location map"
          />
        </div>
      )}
    </div>
  )
}
