import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { CheckboxField } from '.'

const meta: Meta<typeof CheckboxField> = {
  title: 'UI/Checkbox',
  component: CheckboxField,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CheckboxField>

export const Unchecked: Story = {
  args: { id: 'unchecked', label: 'I agree to the terms and conditions' },
}

export const Checked: Story = {
  args: { id: 'checked', label: 'Send me funeral arrangement updates', defaultChecked: true },
}

export const Disabled: Story = {
  args: { id: 'disabled', label: 'Notifications (unavailable)', disabled: true },
}
