'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const navCta = data?.navCta || []

  return (
    <nav className="flex justify-end items-center w-full">
      <section className="flex gap-x-2">
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="link" />
        })}
      </section>
      <section>
        {navCta.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="default" />
        })}
      </section>
      {/* <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link> */}
    </nav>
  )
}
