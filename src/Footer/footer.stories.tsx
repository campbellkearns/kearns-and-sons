import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FooterClient } from './Component.client'

const meta: Meta<typeof FooterClient> = {
  title: 'Footer/FooterClient',
  component: FooterClient,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof FooterClient>

const fullData = {
  id: 'footer',
  servicesLinks: [
    { link: { label: 'Funeral Services', type: 'custom' as const, url: '/services/funeral' } },
    { link: { label: 'Cremation', type: 'custom' as const, url: '/services/cremation' } },
    { link: { label: 'Pre-Planning', type: 'custom' as const, url: '/services/pre-planning' } },
    { link: { label: 'Grief Support', type: 'custom' as const, url: '/services/grief-support' } },
  ],
  companyLinks: [
    { link: { label: 'About Us', type: 'custom' as const, url: '/about' } },
    { link: { label: 'Our Team', type: 'custom' as const, url: '/team' } },
    { link: { label: 'Obituaries', type: 'custom' as const, url: '/memorials' } },
    { link: { label: 'Resources', type: 'custom' as const, url: '/resources' } },
    { link: { label: 'Contact', type: 'custom' as const, url: '/contact' } },
  ],
  navItems: [],
  address: '123 Main Street\nTroy, NC 27371',
  phoneNumber: '(910) 576-0531',
  hoursOfOperation: 'Mon–Fri: 8am–6pm\nAvailable 24/7 for emergencies',
  serviceArea: 'Serving Troy, NC and surrounding communities',
}

export const Default: Story = {
  args: { data: fullData },
}

export const MinimalData: Story = {
  args: {
    data: {
      id: 'footer',
      servicesLinks: null,
      companyLinks: null,
      navItems: [],
      address: '123 Main Street\nTroy, NC 27371',
      phoneNumber: '(910) 576-0531',
      hoursOfOperation: null,
      serviceArea: null,
    },
  },
}
