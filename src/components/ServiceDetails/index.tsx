import { Badge } from '@/components/ui/badge'
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

  const {
    pending,
    serviceDateTime,
    serviceLocation,
    viewingDateTime,
    viewingLocation,
    internmentLocation,
  } = serviceDetails

  const hasViewing = viewingDateTime && viewingLocation

  return (
    <section className="border-t border-border mt-12 py-6">
      <h2 className="font-heading text-2xl font-normal mb-6">Service Details</h2>

      {pending ? (
        <p className="font-body text-base italic">Service details have not yet been arranged.</p>
      ) : (
        <dl className="flex flex-col gap-4">
          <div>
            <dt className="mb-2"><Badge variant="subtle">Service</Badge></dt>
            {serviceDateTime && (
              <dd className="font-body text-base">{formatServiceDateTime(serviceDateTime)}</dd>
            )}
            {serviceLocation && <dd className="font-body text-base">{serviceLocation}</dd>}
          </div>

          {hasViewing && (
            <div>
              <dt className="mb-2"><Badge variant="subtle">Viewing</Badge></dt>
              <dd className="font-body text-base">{formatServiceDateTime(viewingDateTime)}</dd>
              <dd className="font-body text-base">{viewingLocation}</dd>
            </div>
          )}

          {internmentLocation && (
            <div>
              <dt className="mb-2"><Badge variant="subtle">Internment</Badge></dt>
              <dd className="font-body text-base">{internmentLocation}</dd>
            </div>
          )}
        </dl>
      )}
    </section>
  )
}
