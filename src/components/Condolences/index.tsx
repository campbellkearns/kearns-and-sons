import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Comment } from '@/payload-types'

import { CondolenceCard } from './CondolenceCard'
import { CondolenceForm } from './CondolenceForm'

interface CondolencesProps {
  relationID: string
  subjectName?: string
}

export const Condolences: React.FC<CondolencesProps> = async ({ relationID, subjectName }) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: condolences } = await payload.find({
    collection: 'comments',
    where: {
      relationID: { equals: relationID },
      relationTo: { equals: 'memorials' },
      approved: { equals: true },
    },
    limit: 100,
    sort: '-createdAt',
  })

  return (
    <section aria-labelledby="condolences-heading">
      <div className="space-y-8">
        <div className="border-b border-border pb-4">
          <h2 id="condolences-heading" className="font-heading text-2xl font-normal">
            Condolences ({condolences.length})
          </h2>
        </div>

        {condolences.length > 0 ? (
          <div className="flex flex-col gap-6" role="list" aria-label="Condolences list">
            {condolences.map((comment: Comment) => (
              <div key={comment.id} role="listitem">
                <CondolenceCard comment={comment} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-card border border-dashed border-border rounded-lg">
            <p className="font-body text-base text-muted-foreground mx-auto max-w-md">
              {subjectName
                ? `We invite you to honor the life of ${subjectName}. Feel free to share a condolence or loving memory here.`
                : 'No condolences have been shared yet.'}
            </p>
          </div>
        )}

        <CondolenceForm relationID={relationID} />
      </div>
    </section>
  )
}
