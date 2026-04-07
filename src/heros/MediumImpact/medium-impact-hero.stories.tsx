import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { MediumImpactHero } from '.'

const meta: Meta<typeof MediumImpactHero> = {
  title: 'Heros/MediumImpactHero',
  component: MediumImpactHero,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof MediumImpactHero>

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
            text: 'Our Services',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'We offer compassionate funeral and cremation services tailored to honor each life.',
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
      url: '/services',
      label: 'Learn More',
      appearance: 'default' as const,
      newTab: false,
    },
  },
]

export const Default: Story = {
  name: 'Default — All Fields',
  args: {
    type: 'mediumImpact',
    richText: mockRichText as any,
    links: mockLinks,
    media: null,
  },
}

export const NoImage: Story = {
  name: 'No Image — Navy Fallback',
  args: {
    type: 'mediumImpact',
    richText: mockRichText as any,
    links: mockLinks,
    media: null,
  },
}

export const NoLinks: Story = {
  name: 'No Links — Content Only',
  args: {
    type: 'mediumImpact',
    richText: mockRichText as any,
    links: [],
    media: null,
  },
}
