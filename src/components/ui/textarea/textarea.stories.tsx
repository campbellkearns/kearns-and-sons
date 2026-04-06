import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Textarea } from '.'

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {},
}

export const WithPlaceholder: Story = {
  args: { placeholder: 'Share a message with the family…' },
}

export const ErrorState: Story = {
  args: {
    'aria-invalid': true,
    defaultValue: 'This field has an error.',
    className: 'border-error focus-visible:ring-error',
  },
}

export const Disabled: Story = {
  args: { placeholder: 'Disabled textarea', disabled: true },
}
