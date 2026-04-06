import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Pagination } from '.'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/posts/page/1' },
    },
  },
  argTypes: {
    page: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

export const MiddlePage: Story = {
  args: { page: 3, totalPages: 5 },
}

export const FirstPage: Story = {
  args: { page: 1, totalPages: 5 },
}

export const LastPage: Story = {
  args: { page: 5, totalPages: 5 },
}

/** Single-page result — Pagination renders nothing (returns null internally via hidden state) */
export const SinglePage: Story = {
  args: { page: 1, totalPages: 1 },
}
