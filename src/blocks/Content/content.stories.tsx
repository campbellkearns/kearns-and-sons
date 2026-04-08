import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { ContentBlock } from './Component'

const meta: Meta<typeof ContentBlock> = {
  title: 'Blocks/Content',
  component: ContentBlock,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ContentBlock>

const bodyText = (text: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text, version: 1 }],
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
})

export const OneColumn: Story = {
  args: {
    columns: [
      {
        size: 'full',
        richText: bodyText('We are honored to serve families in their time of need with compassion, dignity, and respect. Our team is here for you every step of the way.') as any,
        enableLink: false,
      },
    ],
  },
}

export const TwoColumn: Story = {
  args: {
    columns: [
      {
        size: 'half',
        richText: bodyText('For over three generations, the Kearns family has been a trusted presence in Montgomery County, providing thoughtful and personalized funeral services.') as any,
        enableLink: false,
      },
      {
        size: 'half',
        richText: bodyText('We offer a full range of services — from traditional funerals and burials to cremation and memorial celebrations of life — tailored to honor each unique life.') as any,
        enableLink: false,
      },
    ],
  },
}

export const ThreeColumn: Story = {
  args: {
    columns: [
      {
        size: 'oneThird',
        richText: bodyText('Traditional Funerals\n\nWe guide families through every detail of a traditional service with care and professionalism.') as any,
        enableLink: false,
      },
      {
        size: 'oneThird',
        richText: bodyText('Cremation Services\n\nA dignified cremation option with full planning support and memorialization choices.') as any,
        enableLink: false,
      },
      {
        size: 'oneThird',
        richText: bodyText('Pre-Planning\n\nProtect your family from difficult decisions by planning ahead with our compassionate guidance.') as any,
        enableLink: false,
      },
    ],
  },
}
