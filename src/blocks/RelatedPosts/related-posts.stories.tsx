import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { RelatedPosts } from './Component'

const meta: Meta<typeof RelatedPosts> = {
  title: 'Blocks/RelatedPosts',
  component: RelatedPosts,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof RelatedPosts>

const mockPosts = [
  {
    id: '1',
    title: 'How to Pre-Plan a Funeral: A Step-by-Step Guide',
    slug: 'how-to-pre-plan-a-funeral',
    categories: [{ id: '1', title: 'Planning', slug: 'planning' }],
    meta: {
      description: 'Pre-planning your funeral is one of the most thoughtful gifts you can give your loved ones.',
      image: null,
    },
    publishedAt: '2026-03-22T00:00:00.000Z',
    populatedAuthors: [{ id: '1', name: 'James Kearns' }],
    updatedAt: '',
    createdAt: '',
  },
  {
    id: '2',
    title: 'Understanding Grief: A Guide for Families',
    slug: 'understanding-grief',
    categories: [{ id: '2', title: 'Grief Support', slug: 'grief-support' }],
    meta: {
      description: 'Grief is a deeply personal journey. We share resources and insights to help families navigate this difficult time.',
      image: null,
    },
    publishedAt: '2026-02-14T00:00:00.000Z',
    populatedAuthors: [{ id: '1', name: 'James Kearns' }],
    updatedAt: '',
    createdAt: '',
  },
  {
    id: '3',
    title: 'Cremation vs. Burial: What to Consider',
    slug: 'cremation-vs-burial',
    categories: [{ id: '3', title: 'Services', slug: 'services' }],
    meta: {
      description: 'Choosing between cremation and burial is a deeply personal decision. We walk through the key considerations.',
      image: null,
    },
    publishedAt: '2026-01-30T00:00:00.000Z',
    populatedAuthors: [{ id: '1', name: 'James Kearns' }],
    updatedAt: '',
    createdAt: '',
  },
]

export const Default: Story = {
  name: 'Default — 3 Posts',
  args: {
    docs: mockPosts as any,
  },
}
