import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Comment } from '@/payload-types'

import { CommentForm } from './CommentForm'
import { CommentComponent } from './Comment'

interface CommentsProps {
  relationID: string
  relationTo: string
}

export const Comments: React.FC<CommentsProps> = async ({
  relationID,
  relationTo,
}) => {
  const payload = await getPayload({ config: configPromise })

  // Fetch approved comments only (access control in collection handles this for public users)
  const { docs: comments } = await payload.find({
    collection: 'comments',
    where: {
      relationID: {
        equals: relationID,
      },
      relationTo: {
        equals: relationTo,
      },
    },
    limit: 100,
    sort: '-createdAt',
  })

  // Determine content type for display
  const contentType = relationTo === 'memorials' ? 'Condolences' : 'Comments'
  const singleContentType = relationTo === 'memorials' ? 'condolence' : 'comment'

  return (
    <section className="mt-12" aria-labelledby="comments-heading">
      <div className="space-y-8">
        {/* Comments Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <h2 
            id="comments-heading" 
            className="text-2xl font-bold text-gray-900 dark:text-gray-100"
          >
            {contentType} ({comments.length})
          </h2>
          {comments.length > 0 && (
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-base">
              Sharing memories and support during this difficult time.
            </p>
          )}
        </div>

        {/* Comments List */}
        {comments.length > 0 ? (
          <div className="space-y-6" role="list" aria-label={`${contentType} list`}>
            {comments.map((comment: Comment) => (
              <div key={comment.id} role="listitem">
                <CommentComponent comment={comment} relationTo={relationTo} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="mx-auto max-w-md">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No {contentType.toLowerCase()} yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-base">
                Be the first to share a {singleContentType}.
              </p>
            </div>
          </div>
        )}

        {/* Comment Form */}
        <CommentForm 
          relationTo={relationTo} 
          relationID={relationID}
          // Optional: Add callback to refresh comments
          // onCommentSubmitted={() => router.refresh()}
        />
      </div>
    </section>
  )
}
