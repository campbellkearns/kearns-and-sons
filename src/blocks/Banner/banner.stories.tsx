import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { BannerBlock } from './Component'

const meta: Meta<typeof BannerBlock> = {
  title: 'Blocks/Banner',
  component: BannerBlock,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof BannerBlock>

const mockRichText = {
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'Our office will be closed Monday, April 21st in observance of Easter.', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
} as any

export const Info: Story = {
  args: {
    style: 'info',
    content: mockRichText,
  },
}

export const Warning: Story = {
  args: {
    style: 'warning',
    content: mockRichText,
  },
}

export const Error: Story = {
  args: {
    style: 'error',
    content: mockRichText,
  },
}

export const Success: Story = {
  args: {
    style: 'success',
    content: mockRichText,
  },
}
