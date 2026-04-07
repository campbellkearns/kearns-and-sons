import React from 'react'
import type { Comment } from '@/payload-types'

export const CondolenceCard: React.FC<{ comment: Comment }> = ({ comment }) => {
  const { authorName, content, createdAt, relationTo } = comment

  const contentType = relationTo === 'memorials' ? 'condolence' : 'comment'

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(createdAt))

  return (
    <article className="bg-card border border-border border-l-2 border-l-accent rounded-lg p-6">
      <header className="flex flex-col gap-1 mb-4">
        <span className="font-heading text-lg font-normal text-foreground">{authorName}</span>
        <time dateTime={createdAt} className="font-body text-sm italic text-label">
          {formattedDate}
        </time>
      </header>

      <p className="font-body italic text-base leading-relaxed whitespace-pre-wrap text-foreground">
        {content}
      </p>

      <span className="sr-only">
        End of {contentType} from {authorName}
      </span>
    </article>
  )
}
