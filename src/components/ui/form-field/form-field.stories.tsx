import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '.'

const meta: Meta<typeof FormField> = {
  title: 'UI/FormField',
  component: FormField,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FormField>

export const Default: Story = {
  render: () => (
    <FormField label="Full name" id="story-name">
      <Input type="text" placeholder="Jane Doe" />
    </FormField>
  ),
}

export const WithError: Story = {
  render: () => (
    <FormField label="Email address" id="story-email" error="Please enter a valid email address.">
      <Input type="email" defaultValue="not-an-email" />
    </FormField>
  ),
}

export const WithTextarea: Story = {
  render: () => (
    <FormField label="Message to the family" id="story-message">
      <Textarea placeholder="Share a memory or offer your condolences…" />
    </FormField>
  ),
}
