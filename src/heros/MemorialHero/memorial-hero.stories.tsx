import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { MemorialHero } from '.'

const meta: Meta<typeof MemorialHero> = {
  title: 'Heros/MemorialHero',
  component: MemorialHero,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof MemorialHero>

const baseCategories = [
  { id: '1', title: 'In Memoriam', slug: 'in-memoriam', updatedAt: '', createdAt: '' },
]

export const Default: Story = {
  name: 'Default — All Fields',
  args: {
    title: 'Margaret Anne Whitfield',
    heroImage: null,
    dateOfService: '2026-04-15T14:00:00.000Z',
    categories: baseCategories,
  },
}

export const NoImage: Story = {
  name: 'No Image — Navy Background',
  args: {
    title: 'Robert James Howell Sr.',
    heroImage: null,
    dateOfService: '2026-04-18T10:00:00.000Z',
    categories: baseCategories,
  },
}

export const NoDates: Story = {
  name: 'No Dates — Name Only',
  args: {
    title: 'Dorothy Mae Tucker',
    heroImage: null,
    dateOfService: null,
    dateOfBirth: null,
    dateOfPassing: null,
    categories: baseCategories,
  },
}

export const ServicePending: Story = {
  name: 'Service Pending',
  args: {
    title: 'William Earl Patterson',
    heroImage: null,
    dateOfService: null,
    categories: baseCategories,
  },
}

export const NoCategories: Story = {
  name: 'No Categories',
  args: {
    title: 'Eleanor Ruth Simmons',
    heroImage: null,
    dateOfService: '2026-04-20T11:00:00.000Z',
    categories: [],
  },
}
