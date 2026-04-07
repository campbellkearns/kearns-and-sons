import type { Meta, StoryObj } from '@storybook/react'
import type { Post } from '@/payload-types'
import React from 'react'
import { PostHero } from '.'

const meta: Meta<typeof PostHero> = {
  title: 'Heros/PostHero',
  component: PostHero,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof PostHero>

const mockContent: Post['content'] = {
  root: {
    type: 'root',
    children: [],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
}

const basePost: Post = {
  id: '1',
  title: 'Reflecting on a Life Well Lived',
  slug: 'reflecting-on-a-life-well-lived',
  heroImage: null,
  content: mockContent,
  categories: [
    {
      id: '1',
      title: 'Grief & Healing',
      slug: 'grief-and-healing',
      updatedAt: '',
      createdAt: '',
    },
  ],
  populatedAuthors: [{ id: '1', name: 'James Kearns' }],
  _status: 'published' as const,
  updatedAt: '',
  createdAt: '',
}

export const Default: Story = {
  name: 'Default — All Fields',
  args: {
    post: basePost,
  },
}

export const NoImage: Story = {
  name: 'No Image — Dark Fallback',
  args: {
    post: {
      ...basePost,
      heroImage: null,
    },
  },
}

export const NoAuthors: Story = {
  name: 'No Authors — Author Section Hidden',
  args: {
    post: {
      ...basePost,
      populatedAuthors: [],
    },
  },
}

export const MultipleCategories: Story = {
  name: 'Multiple Categories',
  args: {
    post: {
      ...basePost,
      categories: [
        { id: '1', title: 'Grief & Healing', slug: 'grief-and-healing', updatedAt: '', createdAt: '' },
        { id: '2', title: 'Community', slug: 'community', updatedAt: '', createdAt: '' },
      ],
    },
  },
}
