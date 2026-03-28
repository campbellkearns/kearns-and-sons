'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const navCta = data?.navCta || []
  const phoneNumber = data?.phoneNumber

  return (
    <nav aria-label="Primary" className="flex justify-end items-center w-full gap-x-4">
      <ul className="flex gap-x-2 list-none">
        {navItems.map(({ link }, i) => (
          <li key={i}>
            <CMSLink {...link} appearance="link" />
          </li>
        ))}
      </ul>
      <ul className="list-none">
        {navCta.map(({ link }, i) => (
          <li key={i}>
            <CMSLink {...link} appearance="default" />
          </li>
        ))}
      </ul>
      {phoneNumber && (
        <a
          href={`tel:${phoneNumber.replace(/\D/g, '')}`}
          className="text-sm font-semibold whitespace-nowrap hover:underline"
          aria-label={`Call us at ${phoneNumber}`}
        >
          {phoneNumber}
        </a>
      )}
      {/* <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link> */}
    </nav>
  )
}
