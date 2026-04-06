import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Badge } from '.'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'accent'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: { children: 'Service Pending', variant: 'default' },
}

export const Subtle: Story = {
  args: { children: 'Category', variant: 'subtle' },
}

export const Accent: Story = {
  args: { children: 'Featured', variant: 'accent' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="default">Service Pending</Badge>
      <Badge variant="subtle">Obituary</Badge>
      <Badge variant="accent">Featured</Badge>
    </div>
  ),
}
