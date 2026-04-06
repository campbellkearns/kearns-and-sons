'use client'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Button } from '@/components/ui/button'
import { SectionDivider } from '@/components/ui/section-divider'
import type { Header } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Menu, Phone, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

interface MobileNavProps {
  data: Header
  /** Story-only: mount the panel in the open state */
  defaultOpen?: boolean
}

const getFocusable = (el: HTMLElement | null): HTMLElement[] =>
  el
    ? [
        ...el.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])',
        ),
      ]
    : []

export const MobileNav: React.FC<MobileNavProps> = ({ data, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const pathname = usePathname()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const navItems = data?.navItems || []
  const navCta = data?.navCta || []
  const phoneNumber = data?.phoneNumber

  // Close on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Focus management on open/close
  useEffect(() => {
    if (isOpen) {
      const focusable = getFocusable(panelRef.current)
      focusable[0]?.focus()
    } else {
      triggerRef.current?.focus()
    }
  }, [isOpen])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      return
    }
    if (e.key !== 'Tab') return

    const focusable = getFocusable(panelRef.current)
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }
  }

  return (
    <>
      {/* Hamburger trigger — mobile only */}
      <button
        ref={triggerRef}
        className="lg:hidden flex h-11 w-11 items-center justify-center rounded text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>

      {/* Full-viewport curtain panel */}
      <div
        ref={panelRef}
        id="mobile-nav-panel"
        role="dialog"
        aria-label="Mobile menu"
        aria-modal="true"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore — React 19 supports inert as boolean; TS types may lag
        inert={!isOpen || undefined}
        onKeyDown={handleKeyDown}
        className={cn(
          'fixed inset-0 z-50 flex flex-col bg-background px-6 pt-6 pb-16 overflow-y-auto',
          'motion-safe:transition-[transform,opacity] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.4,0,0.2,1)]',
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0',
        )}
      >
        {/* Panel top row: logo + close */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            aria-label="Kearns and Sons — home"
            onClick={() => setIsOpen(false)}
          >
            <Logo loading="eager" priority="high" />
          </Link>
          <button
            className="flex h-11 w-11 items-center justify-center rounded text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          >
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>

        {/* Gold accent rule — brand-encoded structure */}
        <SectionDivider className="mt-6" />

        {/* Primary nav items */}
        {navItems.length > 0 && (
          <nav aria-label="Mobile navigation" className="mt-8">
            <ul className="list-none flex flex-col">
              {navItems.map(({ link }, i) => (
                <li key={i} className="border-b border-border/40 last:border-b-0">
                  <CMSLink
                    {...link}
                    appearance="inline"
                    className="block font-body text-2xl text-foreground py-4 hover:text-primary transition-colors duration-150"
                  />
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Phone number */}
        {phoneNumber && (
          <a
            href={`tel:${phoneNumber.replace(/\D/g, '')}`}
            className="mt-8 flex items-center gap-2 font-body text-base text-muted-foreground hover:text-foreground transition-colors duration-150"
            aria-label={`Call us at ${phoneNumber}`}
          >
            <Phone className="size-4 shrink-0" aria-hidden="true" />
            {phoneNumber}
          </a>
        )}

        {/* CTA button(s) */}
        {navCta.length > 0 && (
          <div className="mt-6 flex flex-col gap-3">
            {navCta.map(({ link }, i) => (
              <Button key={i} asChild size="lg" className="w-full">
                <CMSLink {...link} appearance="inline" />
              </Button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
