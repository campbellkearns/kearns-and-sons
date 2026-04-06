import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { CMSLink } from '.'

const meta: Meta<typeof CMSLink> = {
  title: 'Components/CMSLink',
  component: CMSLink,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CMSLink>

export const Default: Story = {
  args: {
    label: 'Our Services',
    url: '/services',
    type: 'custom',
    appearance: 'inline',
  },
}

export const ExternalLink: Story = {
  args: {
    label: 'View obituary',
    url: 'https://example.com/obituary',
    type: 'custom',
    appearance: 'inline',
    newTab: true,
  },
}

export const ButtonVariant: Story = {
  args: {
    label: 'Speak With Us',
    url: '/contact',
    type: 'custom',
    appearance: 'default',
  },
}
