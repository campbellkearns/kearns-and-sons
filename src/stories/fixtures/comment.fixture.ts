import type { Comment } from '@/payload-types'

export const commentFixture: Comment = {
  id: 'fixture-comment-1',
  authorName: 'Robert Kearns',
  authorEmail: 'robert@example.com',
  content:
    'Margaret was one of the kindest people I have ever known. She always had a warm smile and a kind word for everyone she met. We will miss her dearly.',
  relationTo: 'memorials',
  relationID: 'fixture-memorial-1',
  approved: true,
  createdAt: '2026-03-15T14:30:00.000Z',
  updatedAt: '2026-03-15T14:30:00.000Z',
}

export const commentFixtures: Comment[] = [
  commentFixture,
  {
    id: 'fixture-comment-2',
    authorName: 'Helen Tremblay',
    authorEmail: 'helen@example.com',
    content:
      'I had the pleasure of knowing Margaret through our church group for over thirty years. Her faith, her generosity, and her laughter will be remembered by all of us.',
    relationTo: 'memorials',
    relationID: 'fixture-memorial-1',
    approved: true,
    createdAt: '2026-03-14T09:15:00.000Z',
    updatedAt: '2026-03-14T09:15:00.000Z',
  },
  {
    id: 'fixture-comment-3',
    authorName: 'James Holloway',
    authorEmail: 'james@example.com',
    content: 'A wonderful neighbour and a true friend. Sending love to the Kearns family.',
    relationTo: 'memorials',
    relationID: 'fixture-memorial-1',
    approved: true,
    createdAt: '2026-03-13T16:45:00.000Z',
    updatedAt: '2026-03-13T16:45:00.000Z',
  },
]
