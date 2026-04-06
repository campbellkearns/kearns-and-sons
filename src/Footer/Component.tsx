import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const { address, phoneNumber, hoursOfOperation, serviceArea } = footerData ?? {}

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">

          {/* Left: brand + contact info */}
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="Kearns and Sons — home" className="inline-block">
              <Logo />
            </Link>

            {address && (
              <address className="not-italic whitespace-pre-line font-body text-sm text-white/80 leading-relaxed">
                {address}
              </address>
            )}

            {phoneNumber && (
              <a
                href={`tel:${phoneNumber.replace(/\D/g, '')}`}
                className="font-body text-sm text-white/80 hover:text-white transition-colors"
                aria-label={`Call us at ${phoneNumber}`}
              >
                {phoneNumber}
              </a>
            )}

            {hoursOfOperation && (
              <p className="whitespace-pre-line font-body text-sm text-white/80 leading-relaxed">
                {hoursOfOperation}
              </p>
            )}

            {serviceArea && (
              <p className="font-body text-sm text-white/60 italic">
                {serviceArea}
              </p>
            )}
          </div>

          {/* Right: quick links */}
          {navItems.length > 0 && (
            <nav aria-label="Footer" className="md:flex md:justify-end">
              <ul className="flex flex-col gap-3 list-none">
                {navItems.map(({ link }, i) => (
                  <li key={i}>
                    <CMSLink className="font-body text-sm text-white/80 hover:text-white transition-colors" {...link} />
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {/* Bottom strip */}
        <div className="mt-10 pt-6 border-t border-white/10 flex justify-end">
          <ThemeSelector />
        </div>
      </div>
    </footer>
  )
}
