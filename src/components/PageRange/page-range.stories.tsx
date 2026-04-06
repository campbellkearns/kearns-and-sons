import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { PageRange } from '.'

const meta: Meta<typeof PageRange> = {
  title: 'Components/PageRange',
  component: PageRange,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PageRange>

export const Default: Story = {
  args: {
    collection: 'posts',
    currentPage: 2,
    limit: 10,
    totalDocs: 47,
  },
}

export const Memorials: Story = {
  args: {
    collection: 'memorials',
    currentPage: 1,
    limit: 12,
    totalDocs: 8,
  },
}

export const NoResults: Story = {
  args: {
    collection: 'posts',
    currentPage: 1,
    limit: 10,
    totalDocs: 0,
  },
}
