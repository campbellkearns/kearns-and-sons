import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { CondolenceCard } from '.'

const meta: Meta<typeof CondolenceCard> = {
  title: 'Components/CondolenceCard',
  component: CondolenceCard,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
  },
}

export default meta
type Story = StoryObj<typeof CondolenceCard>

const makeComment = (overrides: Partial<Parameters<typeof CondolenceCard>[0]['comment']> = {}) => ({
  id: '1',
  authorName: 'Patricia Monroe',
  authorEmail: 'patricia@example.com',
  content:
    'Margaret was the kindest soul I have ever had the pleasure of knowing. She welcomed everyone into her home with warmth and generosity. Our hearts are with the Whitfield family during this time.',
  relationTo: 'memorials' as const,
  relationID: 'memorial-1',
  approved: true,
  createdAt: '2026-04-11T14:30:00.000Z',
  updatedAt: '2026-04-11T14:30:00.000Z',
  ...overrides,
})

export const Default: Story = {
  args: { comment: makeComment() },
}

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-2xl">
      <CondolenceCard comment={makeComment({ id: '1', authorName: 'Patricia Monroe' })} />
      <CondolenceCard
        comment={makeComment({
          id: '2',
          authorName: 'Thomas & Elaine Reed',
          createdAt: '2026-04-10T09:15:00.000Z',
          content:
            'We will forever treasure the memories of Sunday dinners and summers on the porch. Margaret leaves behind a legacy of love.',
        })}
      />
      <CondolenceCard
        comment={makeComment({
          id: '3',
          authorName: 'Reverend David Simms',
          createdAt: '2026-04-09T16:00:00.000Z',
          content: 'She lived a life full of grace and devotion. Rest in peace, dear Margaret.',
        })}
      />
    </div>
  ),
}
