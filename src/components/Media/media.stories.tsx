/**
 * Alt text requirement:
 * All Media call sites must pass meaningful alt text. ImageMedia falls back to
 * resource.alt (from Payload) then '' — empty alt is acceptable ONLY for
 * decorative images. For content images, always pass alt via the `alt` prop
 * or ensure the Payload Media document has a populated alt field.
 */
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Media } from '.'

const meta: Meta<typeof Media> = {
  title: 'Components/Media',
  component: Media,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Media>

export const WithImage: Story = {
  render: () => (
    <div className="w-64">
      <Media
        alt="A peaceful cemetery at dusk with oak trees"
        src={{ src: '/media/sun-11582_1280.jpg', width: 600, height: 400 } as any}
        imgClassName="rounded w-full h-auto"
      />
    </div>
  ),
}

export const NoImage: Story = {
  render: () => (
    <div className="w-64 h-48 bg-muted rounded flex items-center justify-center">
      <span className="font-body text-sm text-muted-foreground">No image provided</span>
    </div>
  ),
}
