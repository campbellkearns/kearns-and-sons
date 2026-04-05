import type { CardPostData } from '@/components/Card'
import { mediaFixture } from './media.fixture'

export const memorialFixture: CardPostData = {
  title: 'Margaret Louise Henderson',
  slug: 'margaret-louise-henderson',
  categories: [
    {
      id: 'cat-1',
      title: 'Memorial Service',
      slug: 'memorial-service',
      updatedAt: '2026-01-01T00:00:00.000Z',
      createdAt: '2026-01-01T00:00:00.000Z',
    },
  ],
  meta: {
    description:
      'Margaret was a beloved mother, grandmother, and community member who touched the lives of everyone she met.',
    image: mediaFixture,
  },
}

export const memorialFixtureNoImage: CardPostData = {
  title: 'William Thomas Aldridge',
  slug: 'william-thomas-aldridge',
  categories: [
    {
      id: 'cat-1',
      title: 'Memorial Service',
      slug: 'memorial-service',
      updatedAt: '2026-01-01T00:00:00.000Z',
      createdAt: '2026-01-01T00:00:00.000Z',
    },
  ],
  meta: {
    description: 'William was a dedicated husband, father of four, and lifelong member of the Troy community.',
  },
}
