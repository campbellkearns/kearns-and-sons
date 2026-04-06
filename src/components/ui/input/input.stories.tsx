import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Input } from '.'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: { type: 'text' },
}

export const WithPlaceholder: Story = {
  args: { type: 'text', placeholder: 'Enter your name…' },
}

export const ErrorState: Story = {
  args: {
    type: 'text',
    'aria-invalid': true,
    defaultValue: 'invalid@',
    className: 'border-error focus-visible:ring-error',
  },
}

export const Disabled: Story = {
  args: { type: 'text', placeholder: 'Disabled input', disabled: true },
}
