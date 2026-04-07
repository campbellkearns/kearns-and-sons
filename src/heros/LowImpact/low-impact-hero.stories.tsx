import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { LowImpactHero } from '.'

const meta: Meta<typeof LowImpactHero> = {
  title: 'Heros/LowImpactHero',
  component: LowImpactHero,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof LowImpactHero>

const mockRichText = {
  root: {
    type: 'root',
    children: [
      {
        type: 'heading',
        tag: 'h1',
        children: [
          {
            type: 'text',
            text: 'About Us',
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
            text: 'Kearns & Sons has served our community with care and compassion for generations.',
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

export const Default: Story = {
  name: 'Default — RichText',
  args: {
    richText: mockRichText as any,
  },
}

export const WithChildren: Story = {
  name: 'With Children — Custom Heading',
  render: () => (
    <LowImpactHero>
      <h1>Memorials</h1>
      <p>Honoring those who have passed and the lives they lived.</p>
    </LowImpactHero>
  ),
}
