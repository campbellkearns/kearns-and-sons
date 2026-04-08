import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { TrustBarBlock } from './Component'

const meta: Meta<typeof TrustBarBlock> = {
  title: 'Blocks/TrustBar',
  component: TrustBarBlock,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof TrustBarBlock>

export const Default: Story = {
  name: 'Default — 3 Items',
  args: {
    items: [
      { id: '1', label: 'Family-Owned Since 1952', detail: 'Three generations of trusted service in Montgomery County.' },
      { id: '2', label: 'Available 24 Hours', detail: 'Our team is here whenever you need us, day or night.' },
      { id: '3', label: 'Personalized Services', detail: 'Every arrangement is thoughtfully tailored to honor each life.' },
    ],
  },
}
