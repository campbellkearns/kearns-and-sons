import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '.'

const meta: Meta = {
  title: 'UI/Select',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

const OPTIONS = [
  { value: 'traditional', label: 'Traditional burial' },
  { value: 'cremation', label: 'Cremation' },
  { value: 'green', label: 'Green burial' },
  { value: 'celebration', label: 'Celebration of life' },
]

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-64" aria-label="Service type">
        <SelectValue placeholder="Select a service…" />
      </SelectTrigger>
      <SelectContent>
        {OPTIONS.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-64" aria-label="Service type">
        <SelectValue placeholder="Select a service…" />
      </SelectTrigger>
      <SelectContent>
        {OPTIONS.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
}
