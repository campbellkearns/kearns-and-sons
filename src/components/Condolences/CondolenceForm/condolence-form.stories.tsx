import type { Meta, StoryObj } from '@storybook/react'
import { CondolenceForm } from '.'

const meta: Meta<typeof CondolenceForm> = {
  title: 'Components/CondolenceForm',
  component: CondolenceForm,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
  },
  args: {
    relationID: 'memorial-fixture-id',
  },
}

export default meta
type Story = StoryObj<typeof CondolenceForm>

export const Default: Story = {}

export const WithError: Story = {
  name: 'With Validation Errors',
  play: async ({ canvasElement }) => {
    // Submit with empty fields to trigger validation
    const form = canvasElement.querySelector('form')
    const submitButton = canvasElement.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement | null
    if (submitButton) submitButton.click()
  },
}
