import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Input } from '../input'
import { Label } from '.'

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: { children: 'Full name', htmlFor: 'name-field' },
}

export const PairedWithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="paired-input">Full name</Label>
      <Input id="paired-input" type="text" placeholder="Jane Doe" />
    </div>
  ),
}
