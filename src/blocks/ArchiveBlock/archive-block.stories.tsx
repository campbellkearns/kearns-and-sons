import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { CollectionArchive } from '@/components/CollectionArchive'

// ArchiveBlock is an async server component — stories render CollectionArchive directly with mock data.

const meta: Meta<typeof CollectionArchive> = {
  title: 'Blocks/ArchiveBlock',
  component: CollectionArchive,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof CollectionArchive>

const memorialDocs = [
  {
    title: 'Margaret Anne Whitacre',
    slug: 'margaret-anne-whitacre',
    categories: [],
    meta: {
      description: 'A beloved mother of four and grandmother of eleven, Margaret will be remembered for her warmth and unshakeable faith.',
      image: null,
    },
    serviceDetails: {
      pending: false,
      serviceDateTime: '2026-04-15T14:00:00.000Z',
      serviceLocation: 'Kearns & Sons Funeral Home, Troy, NC',
      viewingDateTime: null,
      viewingLocation: null,
      internmentLocation: null,
    },
    publishedAt: '2026-04-10T00:00:00.000Z',
  },
  {
    title: 'Robert James Howell Sr.',
    slug: 'robert-james-howell-sr',
    categories: [],
    meta: {
      description: 'Robert served his community as a volunteer firefighter for over thirty years. He is survived by his wife of fifty-two years, Carol.',
      image: null,
    },
    serviceDetails: {
      pending: true,
      serviceDateTime: null,
      serviceLocation: null,
      viewingDateTime: null,
      viewingLocation: null,
      internmentLocation: null,
    },
    publishedAt: '2026-04-08T00:00:00.000Z',
  },
  {
    title: 'Dorothy Mae Tucker',
    slug: 'dorothy-mae-tucker',
    categories: [],
    meta: {
      description: 'Dorothy was a retired schoolteacher who touched the lives of hundreds of students across Montgomery County.',
      image: null,
    },
    serviceDetails: {
      pending: false,
      serviceDateTime: '2026-04-12T10:00:00.000Z',
      serviceLocation: 'First Baptist Church of Troy, NC',
      viewingDateTime: null,
      viewingLocation: null,
      internmentLocation: null,
    },
    publishedAt: '2026-04-06T00:00:00.000Z',
  },
]

const postDocs = [
  {
    title: 'How to Pre-Plan a Funeral: A Step-by-Step Guide',
    slug: 'how-to-pre-plan-a-funeral',
    categories: [{ id: '1', title: 'Planning', slug: 'planning' }],
    meta: { description: 'Pre-planning your funeral is one of the most thoughtful gifts you can give your loved ones.', image: null },
    publishedAt: '2026-03-22T00:00:00.000Z',
    populatedAuthors: [{ id: '1', name: 'James Kearns' }],
  },
  {
    title: 'Understanding Grief: A Guide for Families',
    slug: 'understanding-grief',
    categories: [{ id: '2', title: 'Grief Support', slug: 'grief-support' }],
    meta: { description: 'Grief is a deeply personal journey. We share resources and insights to help families navigate this difficult time.', image: null },
    publishedAt: '2026-02-14T00:00:00.000Z',
    populatedAuthors: [{ id: '1', name: 'James Kearns' }],
  },
  {
    title: 'Cremation vs. Burial: What to Consider',
    slug: 'cremation-vs-burial',
    categories: [{ id: '3', title: 'Services', slug: 'services' }],
    meta: { description: 'Choosing between cremation and burial is a deeply personal decision.', image: null },
    publishedAt: '2026-01-30T00:00:00.000Z',
    populatedAuthors: [{ id: '1', name: 'James Kearns' }],
  },
]

export const Memorials: Story = {
  name: 'Memorials — 3 Cards',
  args: {
    posts: memorialDocs as any,
    relationTo: 'memorials',
  },
}

export const Posts: Story = {
  name: 'Posts — 3 Cards',
  args: {
    posts: postDocs as any,
    relationTo: 'posts',
  },
}
