import React from 'react'
import type { Comment } from '@/payload-types'

interface CommentComponentProps {
  comment: Comment
  relationTo: string
}

export const CommentComponent: React.FC<CommentComponentProps> = ({ comment, relationTo }) => {
  // Format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Determine the content type for display
  const contentType = relationTo === 'memorials' ? 'condolence' : 'comment'

  return (
    <article className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
            {comment.authorName}
          </h4>
          <time 
            dateTime={comment.createdAt} 
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            {formatDate(comment.createdAt)}
          </time>
        </div>
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-base leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
          {comment.content}
        </p>
      </div>

      {/* Add some visual indicators for accessibility */}
      <div className="sr-only">
        End of {contentType} from {comment.authorName}
      </div>
    </article>
  )
}
