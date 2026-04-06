import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { ServiceDetails } from '.'

const meta: Meta<typeof ServiceDetails> = {
  title: 'Components/ServiceDetails',
  component: ServiceDetails,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ServiceDetails>

const baseDetails = {
  pending: false,
  serviceDateTime: '2026-04-15T14:00:00.000Z',
  serviceLocation: 'Kearns & Sons Funeral Home, 123 Main St, Troy, NC 27371',
  viewingDateTime: '2026-04-14T18:00:00.000Z',
  viewingLocation: 'Kearns & Sons Funeral Home, Chapel Room A',
  internmentLocation: 'Troy Memorial Gardens, Troy, NC',
}

export const Default: Story = {
  args: { serviceDetails: baseDetails },
}

export const Pending: Story = {
  args: {
    serviceDetails: {
      pending: true,
      serviceDateTime: null,
      serviceLocation: null,
      viewingDateTime: null,
      viewingLocation: null,
      internmentLocation: null,
    },
  },
}

export const PartialData: Story = {
  args: {
    serviceDetails: {
      pending: false,
      serviceDateTime: '2026-04-15T14:00:00.000Z',
      serviceLocation: 'Kearns & Sons Funeral Home, Troy, NC',
      viewingDateTime: null,
      viewingLocation: null,
      internmentLocation: null,
    },
  },
}
