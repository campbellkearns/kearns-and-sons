import type { Meta, StoryObj } from '@storybook/react'
import type { Page } from '@/payload-types'
import React from 'react'
import { HighImpactHero } from '.'

const meta: Meta<typeof HighImpactHero> = {
  title: 'Heros/HighImpactHero',
  component: HighImpactHero,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof HighImpactHero>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockRichText = {
  root: {
    type: 'root',
    children: [
      {
        type: 'heading',
        tag: 'h2',
        children: [
          {
            type: 'text',
            text: 'Caring for Families with Dignity',
            version: 1,
          },
        ],
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
}

const mockLinks = [
  {
    link: {
      type: 'custom' as const,
      url: '/memorials',
      label: 'View Memorials',
      appearance: 'default' as const,
      newTab: false,
    },
  },
  {
    link: {
      type: 'custom' as const,
      url: '/contact',
      label: 'Contact Us',
      appearance: 'outline' as const,
      newTab: false,
    },
  },
]

export const Default: Story = {
  name: 'Default — All Fields',
  args: {
    type: 'highImpact',
    richText: mockRichText as any,
    links: mockLinks,
    media: null,
  },
}

export const NoImage: Story = {
  name: 'No Image — Navy Fallback',
  args: {
    type: 'highImpact',
    richText: mockRichText as any,
    links: mockLinks,
    media: null,
  },
}

export const NoLinks: Story = {
  name: 'No Links — Headline Only',
  args: {
    type: 'highImpact',
    richText: mockRichText as any,
    links: [],
    media: null,
  },
}
