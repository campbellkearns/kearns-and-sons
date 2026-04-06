'use client'

import type { Header } from '@/payload-types'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { MobileNav } from '.'

const mockData = {
  navItems: [
    { link: { type: 'custom' as const, url: '/', label: 'Home' } },
    { link: { type: 'custom' as const, url: '/services', label: 'Our Services' } },
    { link: { type: 'custom' as const, url: '/obituaries', label: 'Obituaries' } },
    { link: { type: 'custom' as const, url: '/about', label: 'About Us' } },
    { link: { type: 'custom' as const, url: '/contact', label: 'Contact' } },
  ],
  navCta: [{ link: { type: 'custom' as const, url: '/contact', label: 'Speak With Us' } }],
  phoneNumber: '(910) 576-0531',
} as unknown as Header

const meta: Meta<typeof MobileNav> = {
  title: 'Components/MobileNav',
  component: MobileNav,
  tags: ['autodocs'],
  parameters: {
    // Render at mobile width so the hamburger trigger is visible
    viewport: { defaultViewport: 'mobile1' },
  },
}

export default meta
type Story = StoryObj<typeof MobileNav>

export const Default: Story = {
  args: { data: mockData, defaultOpen: false },
}

export const Open: Story = {
  args: { data: mockData, defaultOpen: true },
}
