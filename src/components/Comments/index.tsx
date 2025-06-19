import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Comment } from '@/payload-types'

import { CommentForm } from './CommentForm'

export const Comments: React.FC<{ relationID: string; relationTo: string }> = async ({
  relationID,
  relationTo,
}) => {
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
      <CommentForm relationTo={relationTo} relationID={relationID} />
    </div>
  )
}
