import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Logo } from './Logo'

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'select',
      options: ['lazy', 'eager'],
    },
    priority: {
      control: 'select',
      options: ['auto', 'high', 'low'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Logo>

export const Default: Story = {
  args: {},
}

export const Small: Story = {
  args: {
    className: 'size-8',
  },
}

export const Large: Story = {
  args: {
    className: 'size-16',
  },
}

export const OnDark: Story = {
  name: 'On Dark',
  args: {},
  decorators: [
    (Story) => (
      <div style={{ background: 'hsl(214 40% 8%)', padding: '2rem', display: 'inline-block' }}>
        <Story />
      </div>
    ),
  ],
}
