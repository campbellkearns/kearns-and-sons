import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Comment } from '@/payload-types'

export const Comments: React.FC<{ relationID: string }> = async ({ relationID }) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: comments } = await payload.find({
    collection: 'comments',
    where: {
      relationID: {
        equals: relationID,
      },
    },
    limit: 100,
    sort: '-createdAt',
  })

  return (
    <div className="comments">
      {comments.map((comment: Comment) => (
        <div key={comment.id} className="comment">
          // display the comment content
          <p>{comment.content}</p>
          <span>{comment.authorName}</span>
        </div>
      ))}
    </div>
  )
}
