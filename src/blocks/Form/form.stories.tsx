import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FormBlock } from './Component'

const meta: Meta<typeof FormBlock> = {
  title: 'Blocks/Form',
  component: FormBlock,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof FormBlock>

const mockForm = {
  id: 'contact',
  title: 'Contact Us',
  fields: [
    { blockType: 'text', name: 'name', label: 'Name', required: true, width: 100 },
    { blockType: 'email', name: 'email', label: 'Email Address', required: true, width: 100 },
    { blockType: 'textarea', name: 'message', label: 'Message', required: true, width: 100 },
  ],
  submitButtonLabel: 'Send Message',
  confirmationType: 'message',
  confirmationMessage: {
    root: { type: 'root', children: [], direction: 'ltr', format: '', indent: 0, version: 1 },
  },
} as any

export const ContactForm: Story = {
  name: 'Contact Form',
  args: {
    enableIntro: false,
    form: mockForm,
  },
}
