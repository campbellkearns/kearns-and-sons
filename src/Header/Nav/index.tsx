'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const navCta = data?.navCta || []

  return (
    <nav aria-label="Primary" className="flex justify-end items-center w-full">
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
      {/* <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link> */}
    </nav>
  )
}
