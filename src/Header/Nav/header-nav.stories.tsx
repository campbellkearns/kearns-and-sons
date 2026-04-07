import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { HeaderNav } from '.'

const meta: Meta<typeof HeaderNav> = {
  title: 'Header/HeaderNav',
  component: HeaderNav,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <header className="container">
        <div className="py-8 flex items-center justify-between">
          <div className="font-heading text-lg">Kearns &amp; Sons</div>
          <Story />
        </div>
      </header>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof HeaderNav>

const baseData = {
  navItems: [
    { link: { label: 'About', type: 'custom' as const, url: '/about' } },
    { link: { label: 'Services', type: 'custom' as const, url: '/services' } },
    { link: { label: 'Obituaries', type: 'custom' as const, url: '/memorials' } },
    { link: { label: 'Resources', type: 'custom' as const, url: '/resources' } },
  ],
  navCta: [{ link: { label: 'Contact', type: 'custom' as const, url: '/contact' } }],
  phoneNumber: '(910) 576-0531',
}

export const Default: Story = {
  args: { data: baseData },
}

export const NoPhone: Story = {
  args: {
    data: {
      ...baseData,
      phoneNumber: undefined,
    },
  },
}

export const NoCta: Story = {
  args: {
    data: {
      ...baseData,
      navCta: [],
    },
  },
}
