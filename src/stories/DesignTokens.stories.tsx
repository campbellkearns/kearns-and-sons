'use client'

import type { Meta } from '@storybook/react'
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Heart,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────

const COLOR_TOKENS = [
  { token: 'background', alias: 'Warm White' },
  { token: 'foreground', alias: 'Deep Navy' },
  { token: 'card', alias: 'Warm Gray' },
  { token: 'card-foreground', alias: 'Deep Navy (soft)' },
  { token: 'primary', alias: 'Kearns Navy' },
  { token: 'primary-foreground', alias: 'White' },
  { token: 'primary-hover', alias: 'Navy Hover' },
  { token: 'secondary', alias: 'Light Steel' },
  { token: 'secondary-foreground', alias: 'Kearns Navy' },
  { token: 'accent', alias: 'Warm Gold' },
  { token: 'accent-foreground', alias: 'Deep Navy' },
  { token: 'muted', alias: 'Muted Warm' },
  { token: 'muted-foreground', alias: 'Slate Gray ⚠' },
  { token: 'label', alias: 'Label Navy (7:1)' },
  { token: 'border', alias: 'Steel Border' },
  { token: 'success', alias: 'Teal Tint' },
  { token: 'warning', alias: 'Amber Tint' },
  { token: 'error', alias: 'Rose Tint' },
]

const TYPE_SCALE = [
  { name: 'display', size: 60, lineHeight: 1.05, usage: 'Hero display text only', font: 'display' },
  { name: '4xl', size: 48, lineHeight: 1.1, usage: 'h1, page titles', font: 'display' },
  { name: '3xl', size: 38, lineHeight: 1.2, usage: 'h2', font: 'display' },
  { name: '2xl', size: 30, lineHeight: 1.3, usage: 'h3', font: 'display' },
  { name: 'xl', size: 24, lineHeight: 1.4, usage: 'Section subheadings, h4', font: 'body' },
  { name: 'lg', size: 20, lineHeight: 1.6, usage: 'Lead paragraphs, card body', font: 'body' },
  { name: 'base', size: 18, lineHeight: 1.7, usage: 'Body copy, form inputs (minimum)', font: 'body' },
  { name: 'sm', size: 16, lineHeight: 1.5, usage: 'Supporting labels, metadata', font: 'body' },
  { name: 'xs', size: 14, lineHeight: 1.5, usage: 'Legal, captions, sr-only adjacent', font: 'body' },
]

const SPACING_RHYTHM = [
  { name: 'gap-4', px: 16, usage: 'Tight stacks within components' },
  { name: 'p-6', px: 24, usage: 'Card internal padding' },
  { name: 'gap-8', px: 32, usage: 'Loose stacks within components' },
  { name: 'py-12', px: 48, usage: 'Trust bar, compact sections' },
  { name: 'py-16', px: 64, usage: 'Section vertical rhythm (minimum between major sections)' },
]

const ICONS = [
  { name: 'Phone', Icon: Phone },
  { name: 'Mail', Icon: Mail },
  { name: 'MapPin', Icon: MapPin },
  { name: 'Calendar', Icon: Calendar },
  { name: 'Clock', Icon: Clock },
  { name: 'ChevronRight', Icon: ChevronRight },
  { name: 'ChevronLeft', Icon: ChevronLeft },
  { name: 'Menu', Icon: Menu },
  { name: 'X', Icon: X },
  { name: 'Heart', Icon: Heart },
  { name: 'ExternalLink', Icon: ExternalLink },
]

const MOTION_CONFIGS = [
  {
    token: '--duration-fast',
    duration: '150ms',
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    easingLabel: 'ease-out',
    label: 'Fast',
  },
  {
    token: '--duration-base',
    duration: '250ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easingLabel: 'ease-in-out',
    label: 'Base',
  },
  {
    token: '--duration-slow',
    duration: '400ms',
    easing: 'cubic-bezier(0.4, 0, 1, 1)',
    easingLabel: 'ease-in',
    label: 'Slow',
  },
]

// ─── Shared styles ────────────────────────────────────────────────────────────

const mono = 'var(--font-mono, ui-monospace, "Geist Mono", monospace)'
const bodyFont = 'var(--font-body, Georgia, serif)'
const displayFont = 'var(--font-display, Georgia, serif)'

// ─── Atoms ────────────────────────────────────────────────────────────────────

function GoldRule() {
  return (
    <div
      aria-hidden="true"
      style={{
        height: 1,
        background: 'hsl(var(--accent))',
        opacity: 0.35,
        margin: '4rem 0',
      }}
    />
  )
}

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div
        style={{
          fontFamily: mono,
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'hsl(var(--accent))',
          marginBottom: '0.5rem',
        }}
      >
        {index}
      </div>
      <h2
        style={{
          fontFamily: displayFont,
          fontSize: 32,
          fontWeight: 700,
          color: 'hsl(var(--foreground))',
          margin: 0,
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>
    </div>
  )
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: bodyFont,
        fontSize: 15,
        color: 'hsl(var(--muted-foreground))',
        marginBottom: '2.5rem',
        lineHeight: 1.7,
        maxWidth: 680,
      }}
    >
      {children}
    </p>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        fontFamily: mono,
        fontSize: 13,
        background: 'hsl(var(--muted))',
        padding: '0.1em 0.35em',
        borderRadius: 3,
        color: 'hsl(var(--foreground))',
      }}
    >
      {children}
    </code>
  )
}

// ─── Color section ────────────────────────────────────────────────────────────

function ColorSwatch({ token, alias }: { token: string; alias: string }) {
  const isWarning = alias.includes('⚠')
  return (
    <div
      style={{
        borderRadius: 'var(--radius, 0.5rem)',
        overflow: 'hidden',
        border: '1px solid hsl(var(--border))',
        background: 'hsl(var(--card))',
      }}
    >
      <div style={{ height: 72, background: `hsl(var(--${token}))` }} />
      <div style={{ padding: '0.625rem 0.75rem' }}>
        <div
          style={{
            fontFamily: mono,
            fontSize: 10,
            color: 'hsl(var(--muted-foreground))',
            marginBottom: 3,
            letterSpacing: '0.02em',
          }}
        >
          --{token}
        </div>
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 12,
            fontWeight: 500,
            color: isWarning ? 'hsl(var(--accent))' : 'hsl(var(--foreground))',
          }}
        >
          {alias}
        </div>
      </div>
    </div>
  )
}

function ThemePanel({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <div
      data-theme={theme}
      style={{
        flex: 1,
        minWidth: 280,
        background: 'hsl(var(--background))',
        border: '1px solid hsl(var(--border))',
        borderRadius: 12,
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          fontFamily: mono,
          fontSize: 11,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'hsl(var(--accent))',
          marginBottom: '1.25rem',
        }}
      >
        {theme === 'light' ? '○ Light Theme' : '● Dark Theme'}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
          gap: '0.625rem',
        }}
      >
        {COLOR_TOKENS.map(({ token, alias }) => (
          <ColorSwatch key={token} token={token} alias={alias} />
        ))}
      </div>
    </div>
  )
}

// ─── Type specimen row ────────────────────────────────────────────────────────

function TypeSpecimenRow({
  name,
  size,
  lineHeight,
  usage,
  font,
  text,
}: {
  name: string
  size: number
  lineHeight: number
  usage: string
  font: string
  text: string
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '180px 1fr',
        gap: '1.5rem',
        alignItems: 'baseline',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid hsl(var(--border))',
      }}
    >
      <div style={{ paddingTop: 4 }}>
        <div
          style={{
            fontFamily: mono,
            fontSize: 12,
            color: 'hsl(var(--primary))',
            marginBottom: 3,
          }}
        >
          text-{name}
        </div>
        <div style={{ fontFamily: mono, fontSize: 11, color: 'hsl(var(--muted-foreground))' }}>
          {size}px · lh {lineHeight}
        </div>
        <div
          style={{
            fontFamily: mono,
            fontSize: 10,
            color: 'hsl(var(--muted-foreground))',
            marginTop: 5,
            opacity: 0.7,
            lineHeight: 1.4,
          }}
        >
          {usage}
        </div>
      </div>
      <div
        style={{
          fontFamily: font === 'display' ? displayFont : bodyFont,
          fontSize: size,
          lineHeight,
          color: 'hsl(var(--foreground))',
          fontWeight: ['display', '4xl', '3xl'].includes(name) ? 700 : 400,
        }}
      >
        {text}
      </div>
    </div>
  )
}

// ─── Motion box ───────────────────────────────────────────────────────────────

function MotionBox({
  token,
  duration,
  easing,
  easingLabel,
  label,
  reduceMotion,
}: {
  token: string
  duration: string
  easing: string
  easingLabel: string
  label: string
  reduceMotion: boolean
}) {
  const [filled, setFilled] = useState(false)
  const ms = parseInt(duration, 10)

  useEffect(() => {
    const interval = setInterval(() => setFilled((f) => !f), ms + 900)
    return () => clearInterval(interval)
  }, [ms])

  return (
    <div
      style={{
        border: '1px solid hsl(var(--border))',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        background: 'hsl(var(--card))',
      }}
    >
      {/* animated track */}
      <div style={{ height: 52, position: 'relative', background: 'hsl(var(--muted))' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'hsl(var(--primary))',
            transform: filled ? 'translateX(0%)' : 'translateX(-100%)',
            transition: reduceMotion ? 'transform 0.01ms' : `transform ${duration} ${easing}`,
          }}
        />
        {/* gold accent strip */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: 3,
            background: 'hsl(var(--accent))',
          }}
        />
      </div>
      <div style={{ padding: '0.875rem' }}>
        <div style={{ fontFamily: mono, fontSize: 11, color: 'hsl(var(--accent))', marginBottom: 3 }}>
          {token}
        </div>
        <div style={{ fontFamily: bodyFont, fontSize: 14, color: 'hsl(var(--foreground))', fontWeight: 500 }}>
          {label} — {duration}
        </div>
        <div style={{ fontFamily: mono, fontSize: 11, color: 'hsl(var(--muted-foreground))', marginTop: 2 }}>
          {easingLabel}
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function DesignTokensPage() {
  const [reduceMotion, setReduceMotion] = useState(false)

  return (
    <div
      style={{
        maxWidth: 1120,
        margin: '0 auto',
        padding: '3.5rem 2rem 6rem',
        color: 'hsl(var(--foreground))',
        background: 'hsl(var(--background))',
        minHeight: '100vh',
      }}
    >
      {/* ── Cover ── */}
      <header
        style={{
          marginBottom: '4rem',
          paddingBottom: '3.5rem',
          borderBottom: '1px solid hsl(var(--border))',
        }}
      >
        <div
          style={{
            fontFamily: mono,
            fontSize: 11,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'hsl(var(--accent))',
            marginBottom: '1rem',
          }}
        >
          Kearns &amp; Sons Funeral Service
        </div>
        <h1
          style={{
            fontFamily: displayFont,
            fontSize: 56,
            fontWeight: 700,
            margin: '0 0 0.75rem',
            lineHeight: 1.05,
            color: 'hsl(var(--foreground))',
          }}
        >
          Design System
        </h1>
        <p
          style={{
            fontFamily: bodyFont,
            fontSize: 18,
            color: 'hsl(var(--muted-foreground))',
            margin: '0 0 2rem',
            lineHeight: 1.65,
            maxWidth: 600,
          }}
        >
          The authoritative reference for visual tokens, typography, spacing, iconography, and
          motion. All values rendered live from CSS custom properties.
        </p>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'hsl(var(--muted))',
            border: '1px solid hsl(var(--border))',
            borderRadius: 'var(--radius)',
            fontSize: 13,
            fontFamily: mono,
            color: 'hsl(var(--muted-foreground))',
          }}
        >
          Neuton · PT Serif · 18px base · navy/gold palette
        </div>
      </header>

      {/* ── 01 Colors ── */}
      <section aria-labelledby="section-colors">
        <SectionLabel index="01" title="Color Tokens" />
        <Prose>
          All swatches render live from <Code>hsl(var(--token))</Code> — the color you see is the
          computed value, not a hardcoded hex. Light and dark themes are shown side-by-side using
          scoped <Code>data-theme</Code> wrappers.{' '}
          <strong style={{ color: 'hsl(var(--foreground))' }}>
            ⚠ --muted-foreground contrast at 7:1 AAA is unverified
          </strong>{' '}
          — use only for decorative or redundant text until DEV-64 confirms the ratio.
        </Prose>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <ThemePanel theme="light" />
          <ThemePanel theme="dark" />
        </div>
      </section>

      <GoldRule />

      {/* ── 02 Typography ── */}
      <section aria-labelledby="section-typography">
        <SectionLabel index="02" title="Typography" />
        <Prose>
          Base size is <strong style={{ color: 'hsl(var(--foreground))' }}>18px</strong> — not
          Tailwind&apos;s default 16px. Display font (Neuton) is used for h1–h3; body font (PT Serif) for
          h4 and below, body copy, and UI text. Specimens use <Code>var(--font-display)</Code> /{' '}
          <Code>var(--font-body)</Code>.
        </Prose>

        {/* Display font */}
        <div style={{ marginBottom: '3rem' }}>
          <div
            style={{
              fontFamily: mono,
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'hsl(var(--accent))',
              marginBottom: '1.5rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid hsl(var(--border))',
            }}
          >
            Display — var(--font-display) · Neuton
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {TYPE_SCALE.filter((s) => s.font === 'display').map((step) => (
              <TypeSpecimenRow
                key={step.name}
                {...step}
                text="In memory of those we love"
              />
            ))}
          </div>
        </div>

        {/* Body font */}
        <div>
          <div
            style={{
              fontFamily: mono,
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'hsl(var(--accent))',
              marginBottom: '1.5rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid hsl(var(--border))',
            }}
          >
            Body — var(--font-body) · PT Serif
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {TYPE_SCALE.filter((s) => s.font === 'body').map((step, i) => (
              <TypeSpecimenRow
                key={step.name}
                {...step}
                text={
                  i < 2
                    ? 'She was a devoted mother, neighbour, and friend whose warmth touched everyone around her.'
                    : i === 2
                      ? 'Memorial service information and details'
                      : 'Supporting label or metadata text'
                }
              />
            ))}
          </div>
        </div>
      </section>

      <GoldRule />

      {/* ── 03 Spacing ── */}
      <section aria-labelledby="section-spacing">
        <SectionLabel index="03" title="Spacing Rhythm" />
        <Prose>
          The PRD-documented rhythm conventions. Base unit is 4px (Tailwind default — unchanged).
          These are starting points for developers, not hard locks. The visual bars are scaled
          proportionally to the spacing value.
        </Prose>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {SPACING_RHYTHM.map(({ name, px, usage }) => (
            <div
              key={name}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr auto',
                gap: '1.5rem',
                alignItems: 'center',
                padding: '1rem 1.25rem',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
                background: 'hsl(var(--card))',
              }}
            >
              <div>
                <div
                  style={{ fontFamily: mono, fontSize: 13, color: 'hsl(var(--primary))', marginBottom: 2 }}
                >
                  {name}
                </div>
                <div style={{ fontFamily: mono, fontSize: 11, color: 'hsl(var(--muted-foreground))' }}>
                  {px}px
                </div>
              </div>
              <div style={{ position: 'relative', height: 20 }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    transform: 'translateY(-50%)',
                    height: Math.max(4, px / 6),
                    width: `${(px / 64) * 100}%`,
                    maxWidth: '100%',
                    background: `hsl(var(--accent))`,
                    opacity: 0.55,
                    borderRadius: 2,
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontSize: 13,
                  color: 'hsl(var(--muted-foreground))',
                  maxWidth: 300,
                  textAlign: 'right',
                }}
              >
                {usage}
              </div>
            </div>
          ))}
        </div>
      </section>

      <GoldRule />

      {/* ── 04 Icons ── */}
      <section aria-labelledby="section-icons">
        <SectionLabel index="04" title="Iconography" />
        <Prose>
          <Code>lucide-react</Code> is the sole icon library — no other sets are introduced. Three
          sizes in use: <Code>size-4</Code> (16px) inline with text, <Code>size-5</Code> (20px) for
          UI controls, <Code>size-6</Code> (24px) standalone or featured. Icons conveying meaning
          must have <Code>aria-label</Code>. Decorative icons:{' '}
          <Code>aria-hidden=&quot;true&quot;</Code>.
        </Prose>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
            gap: '0.875rem',
          }}
        >
          {ICONS.map(({ name, Icon }) => (
            <div
              key={name}
              style={{
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
                padding: '1.25rem',
                background: 'hsl(var(--card))',
              }}
            >
              <div
                style={{
                  fontFamily: mono,
                  fontSize: 11,
                  color: 'hsl(var(--muted-foreground))',
                  marginBottom: '0.875rem',
                  letterSpacing: '0.04em',
                }}
              >
                {name}
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.25rem' }}>
                {[16, 20, 24].map((size) => (
                  <div
                    key={size}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
                  >
                    <Icon size={size} color="hsl(var(--foreground))" aria-hidden="true" />
                    <span
                      style={{
                        fontFamily: mono,
                        fontSize: 9,
                        color: 'hsl(var(--muted-foreground))',
                      }}
                    >
                      {size}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <GoldRule />

      {/* ── 05 Motion ── */}
      <section aria-labelledby="section-motion">
        <SectionLabel index="05" title="Motion" />
        <Prose>
          Three duration tokens, three easing curves. All animations must respect{' '}
          <Code>prefers-reduced-motion</Code> — a global collapse rule is in place in{' '}
          <Code>globals.css</Code>. Toggle the simulation below to verify instant behavior.
        </Prose>

        <button
          onClick={() => setReduceMotion((r) => !r)}
          aria-pressed={reduceMotion}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.125rem',
            marginBottom: '1.5rem',
            border: `1px solid hsl(var(--${reduceMotion ? 'accent' : 'border'}))`,
            borderRadius: 'var(--radius)',
            background: reduceMotion ? 'hsl(var(--accent) / 0.12)' : 'hsl(var(--card))',
            color: 'hsl(var(--foreground))',
            fontFamily: mono,
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          <span aria-hidden="true">{reduceMotion ? '✓' : '○'}</span>
          <span>Simulate prefers-reduced-motion</span>
        </button>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1rem',
          }}
        >
          {MOTION_CONFIGS.map((config) => (
            <MotionBox key={config.token} {...config} reduceMotion={reduceMotion} />
          ))}
        </div>
      </section>
    </div>
  )
}

// ─── Story export ─────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Design System/Tokens',
  parameters: {
    layout: 'fullscreen',
    a11y: { disable: false },
  },
}

export default meta

export const Default = () => <DesignTokensPage />
Default.storyName = 'Design Tokens'
