import type { Preview } from '@storybook/react'
import React, { useEffect } from 'react'
import '../src/app/(frontend)/globals.css'

// globals.css sets html { opacity: 0 } until data-theme is set — override for Storybook
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = 'html { opacity: 1 !important; }'
  document.head.appendChild(style)
}

const ThemeDecorator = (Story: React.ComponentType, context: { globals: { theme?: string } }) => {
  const theme = context.globals?.theme ?? 'light'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div
      data-theme={theme}
      style={{
        background: 'hsl(var(--background))',
        color: 'hsl(var(--foreground))',
        minHeight: '100vh',
        padding: '1.5rem',
        // --font-body will be set by DEV-48; falls back to Geist until then
        fontFamily: 'var(--font-body, var(--font-geist-sans), system-ui, sans-serif)',
      }}
    >
      <Story />
    </div>
  )
}

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        showName: true,
      },
    },
  },
  decorators: [ThemeDecorator],
  parameters: {
    a11y: {
      config: {},
      options: {},
    },
    backgrounds: { disable: true },
  },
}

export default preview
