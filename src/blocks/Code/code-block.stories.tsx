import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { CodeBlock } from './Component'

const meta: Meta<typeof CodeBlock> = {
  title: 'Blocks/Code Block',
  component: CodeBlock,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof CodeBlock>

export const TypeScript: Story = {
  args: {
    blockType: 'code',
    language: 'tsx',
    code: `import React from 'react'

type Props = {
  name: string
  dateOfBirth: string
  dateOfPassing: string
}

export const MemorialHeader: React.FC<Props> = ({ name, dateOfBirth, dateOfPassing }) => {
  return (
    <header className="text-center py-12">
      <h1 className="font-heading text-4xl text-foreground">{name}</h1>
      <p className="font-body text-sm text-muted-foreground mt-2">
        {dateOfBirth} — {dateOfPassing}
      </p>
    </header>
  )
}`,
  },
}

export const JavaScript: Story = {
  args: {
    blockType: 'code',
    language: 'js',
    code: `function formatServiceDate(isoString) {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const display = formatServiceDate('2026-04-15T14:00:00.000Z')
console.log(display) // Wednesday, April 15, 2026`,
  },
}

export const Bash: Story = {
  args: {
    blockType: 'code',
    language: 'bash',
    code: `# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build && npm start`,
  },
}

export const NoLanguage: Story = {
  name: 'No Language',
  args: {
    blockType: 'code',
    code: `Margaret Anne Whitfield
April 3, 1942 — March 28, 2026

Beloved mother, grandmother, and community pillar.
A life well lived.`,
  },
}
