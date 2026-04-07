import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Card } from '.'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
  },
}

export default meta
type Story = StoryObj<typeof Card>

const memorialBase = {
  title: 'Margaret Anne Whitfield',
  slug: 'margaret-anne-whitfield',
  categories: [],
  meta: {
    description:
      'Margaret spent her life in devoted service to her family and community. A beloved mother of four and grandmother of eleven, she will be remembered for her warmth, her cooking, and her unshakeable faith.',
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
}

const postBase = {
  title: 'How to Pre-Plan a Funeral: A Step-by-Step Guide',
  slug: 'how-to-pre-plan-a-funeral',
  categories: [{ id: '1', title: 'Planning', slug: 'planning' }],
  meta: {
    description:
      'Pre-planning your funeral is one of the most thoughtful gifts you can give your loved ones. Here is what you need to know to get started.',
    image: null,
  },
  publishedAt: '2026-03-22T00:00:00.000Z',
  populatedAuthors: [{ id: '1', name: 'James Kearns' }],
}

export const Memorial: Story = {
  args: {
    variant: 'memorial',
    doc: memorialBase,
  },
}

export const MemorialNoImage: Story = {
  name: 'Memorial — No Image',
  args: {
    variant: 'memorial',
    doc: {
      ...memorialBase,
      meta: { description: memorialBase.meta.description, image: null },
    },
  },
}

export const MemorialServicePending: Story = {
  name: 'Memorial — Service Pending',
  args: {
    variant: 'memorial',
    doc: {
      ...memorialBase,
      serviceDetails: {
        pending: true,
        serviceDateTime: null,
        serviceLocation: null,
        viewingDateTime: null,
        viewingLocation: null,
        internmentLocation: null,
      },
    },
  },
}

export const Post: Story = {
  args: {
    variant: 'post',
    doc: postBase,
  },
}

export const PostNoImage: Story = {
  name: 'Post — No Image',
  args: {
    variant: 'post',
    doc: {
      ...postBase,
      meta: { description: postBase.meta.description, image: null },
    },
  },
}
