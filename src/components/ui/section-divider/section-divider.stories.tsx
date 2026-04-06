import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { SectionDivider } from '.'

const meta: Meta<typeof SectionDivider> = {
  title: 'UI/SectionDivider',
  component: SectionDivider,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SectionDivider>

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-8 py-4">
      <p className="font-body text-base">
        We provide compassionate funeral services to families in their time of need, honoring each
        life with dignity and care.
      </p>
      <SectionDivider />
      <p className="font-body text-base">
        Our team is available around the clock to guide you through every step of the arrangement
        process.
      </p>
    </div>
  ),
}
