import type { CardPostData } from '@/components/Card'
import { mediaFixture } from './media.fixture'

export const postFixture: CardPostData = {
  title: 'Understanding the Grief Process',
  slug: 'understanding-the-grief-process',
  categories: [
    {
      id: 'cat-2',
      title: 'Resources',
      slug: 'resources',
      updatedAt: '2026-01-01T00:00:00.000Z',
      createdAt: '2026-01-01T00:00:00.000Z',
    },
  ],
  meta: {
    description:
      'A guide to understanding the stages of grief and finding support within your community during difficult times.',
    image: mediaFixture,
  },
}

export const postFixtureNoImage: CardPostData = {
  title: 'Planning Ahead: A Guide to Pre-Need Arrangements',
  slug: 'planning-ahead-pre-need-arrangements',
  categories: [
    {
      id: 'cat-3',
      title: 'Planning',
      slug: 'planning',
      updatedAt: '2026-01-01T00:00:00.000Z',
      createdAt: '2026-01-01T00:00:00.000Z',
    },
  ],
  meta: {
    description:
      'Pre-need arrangements allow you to make your wishes known in advance, relieving your loved ones of difficult decisions during an already challenging time.',
  },
}
