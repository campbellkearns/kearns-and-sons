import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { CallToActionBlock } from './Component'

const meta: Meta<typeof CallToActionBlock> = {
  title: 'Blocks/CallToAction',
  component: CallToActionBlock,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof CallToActionBlock>

const mockRichText = {
  root: {
    type: 'root',
    children: [
      {
        type: 'heading',
        tag: 'h2',
        children: [{ type: 'text', text: 'Pre-plan with confidence.', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'Let our family guide yours through every step. Reach out today to begin planning ahead.', version: 1 }],
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

const mockLinks = [
  {
    link: {
      type: 'custom' as const,
      url: '/contact',
      label: 'Get in Touch',
      appearance: 'default' as const,
      newTab: false,
    },
  },
]

export const Default: Story = {
  args: {
    richText: mockRichText,
    links: mockLinks,
  },
}

export const NoLinks: Story = {
  name: 'No Links — Text Only',
  args: {
    richText: mockRichText,
    links: [],
  },
}
