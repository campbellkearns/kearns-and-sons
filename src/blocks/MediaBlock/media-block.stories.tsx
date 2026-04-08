import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { MediaBlock } from './Component'

const meta: Meta<typeof MediaBlock> = {
  title: 'Blocks/MediaBlock',
  component: MediaBlock,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof MediaBlock>

const mockCaption = {
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'The chapel at Kearns & Sons Funeral Home, Troy, NC — serving families since 1952.', version: 1 }],
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

const mockMedia = {
  id: '1',
  filename: 'chapel.jpg',
  mimeType: 'image/jpeg',
  filesize: 120000,
  width: 1200,
  height: 800,
  url: 'https://placehold.co/1200x800/e8e0d0/183458?text=Chapel',
  alt: 'Chapel interior',
  caption: mockCaption,
  updatedAt: '',
  createdAt: '',
}

const mockMediaNoCaption = {
  ...mockMedia,
  caption: undefined,
}

export const WithCaption: Story = {
  args: {
    media: mockMedia as any,
    enableGutter: true,
  },
}

export const WithoutCaption: Story = {
  args: {
    media: mockMediaNoCaption as any,
    enableGutter: true,
  },
}
