import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, type CardData } from '@/components/Card'

export type Props = {
  posts: CardData[]
  relationTo: 'posts' | 'memorials'
}

export const CollectionArchive: React.FC<Props> = ({ posts, relationTo }) => {
  const isMemorial = relationTo === 'memorials'

  return (
    <div className={cn('container')}>
      <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div className={isMemorial ? 'col-span-full' : 'col-span-4'} key={index}>
                <Card
                  className="h-full"
                  doc={result}
                  relationTo={relationTo}
                  variant={isMemorial ? 'memorial' : 'post'}
                />
              </div>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
