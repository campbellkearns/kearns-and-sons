import type { Memorial } from '@/payload-types'
import React from 'react'

type Props = {
  serviceDetails: Memorial['serviceDetails']
}

const formatServiceDateTime = (iso: string): string => {
  const date = new Date(iso)
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date)
}

export const ServiceDetails: React.FC<Props> = ({ serviceDetails }) => {
  if (!serviceDetails) return null

  const { pending, serviceDateTime, serviceLocation, viewingDateTime, viewingLocation } =
    serviceDetails

  const hasViewing = viewingDateTime && viewingLocation

  return (
    <section className="border-t border-border mt-12 pt-8">
      <h2 className="text-2xl font-semibold mb-6">Service Details</h2>

      {pending ? (
        <p className="text-muted-foreground italic">Service details have not yet been arranged.</p>
      ) : (
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-1">Service</h3>
            {serviceDateTime && (
              <p className="font-medium">{formatServiceDateTime(serviceDateTime)}</p>
            )}
            {serviceLocation && <p>{serviceLocation}</p>}
          </div>

          {hasViewing && (
            <div>
              <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-1">
                Viewing
              </h3>
              <p className="font-medium">{formatServiceDateTime(viewingDateTime)}</p>
              <p>{viewingLocation}</p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
