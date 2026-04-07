'use client'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import type { Footer } from '@/payload-types'
import Link from 'next/link'
import React from 'react'

type Props = {
  data: Footer
}

export const FooterClient: React.FC<Props> = ({ data }) => {
  const { servicesLinks, companyLinks, address, phoneNumber, hoursOfOperation, serviceArea } =
    data ?? {}

  const linkClass = 'font-body text-sm text-white/80 hover:text-white transition-colors'
  const headingClass = 'font-heading text-sm uppercase tracking-widest text-white/50 mb-4'

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Column 1: Services */}
          <div>
            <p className={headingClass}>Services</p>
            {servicesLinks && servicesLinks.length > 0 ? (
              <nav aria-label="Services">
                <ul className="flex flex-col gap-3 list-none">
                  {servicesLinks.map(({ link }, i) => (
                    <li key={i}>
                      <CMSLink className={linkClass} {...link} />
                    </li>
                  ))}
                </ul>
              </nav>
            ) : (
              <p className="font-body text-sm text-white/40 italic">Coming soon</p>
            )}
          </div>

          {/* Column 2: Company */}
          <div>
            <p className={headingClass}>Company</p>
            {companyLinks && companyLinks.length > 0 ? (
              <nav aria-label="Company">
                <ul className="flex flex-col gap-3 list-none">
                  {companyLinks.map(({ link }, i) => (
                    <li key={i}>
                      <CMSLink className={linkClass} {...link} />
                    </li>
                  ))}
                </ul>
              </nav>
            ) : (
              <p className="font-body text-sm text-white/40 italic">Coming soon</p>
            )}
          </div>

          {/* Column 3: Connect */}
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="Kearns and Sons — home" className="self-start">
              <Logo className="size-16" />
            </Link>

            {address && (
              <address className="not-italic whitespace-pre-line font-body text-sm text-white/80 leading-relaxed">
                {address}
              </address>
            )}

            {phoneNumber && (
              <a
                href={`tel:${phoneNumber.replace(/\D/g, '')}`}
                className={linkClass}
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
              <p className="font-body text-sm text-white/60 italic">{serviceArea}</p>
            )}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-10 pt-6 border-t border-white/10 flex justify-end">
          <ThemeSelector />
        </div>
      </div>
    </footer>
  )
}
