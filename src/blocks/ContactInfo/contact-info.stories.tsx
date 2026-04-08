import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { ContactInfoBlock } from './Component'

const meta: Meta<typeof ContactInfoBlock> = {
  title: 'Blocks/ContactInfo',
  component: ContactInfoBlock,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof ContactInfoBlock>

export const AllFields: Story = {
  name: 'All Fields',
  args: {
    phone: '(910) 576-1234',
    address: '123 Main Street\nTroy, NC 27371',
    hours: 'Monday – Friday: 8am – 6pm\nSaturday: 9am – 4pm\nSunday: By appointment',
    googleMapsEmbedUrl: undefined,
  },
}

export const PhoneOnly: Story = {
  name: 'Phone Only',
  args: {
    phone: '(910) 576-1234',
    address: undefined,
    hours: undefined,
    googleMapsEmbedUrl: undefined,
  },
}
