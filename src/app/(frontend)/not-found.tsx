import Link from 'next/link'
import React from 'react'
import { Logo } from '@/components/Logo/Logo'

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center py-32 text-center gap-8">
      <Logo className="w-16 h-16 max-w-[4rem]" />
      <div className="flex flex-col gap-4 max-w-sm">
        <h1 className="font-heading text-3xl font-normal">Page not found</h1>
        <p className="text-foreground/70">
          We couldn&apos;t find what you were looking for. The page may have moved or the link may
          be out of date.
        </p>
      </div>
      <div className="flex gap-6 text-sm">
        <Link
          href="/"
          className="underline underline-offset-4 hover:text-foreground/70 transition-colors"
        >
          Return home
        </Link>
        <Link
          href="/memorials"
          className="underline underline-offset-4 hover:text-foreground/70 transition-colors"
        >
          View memorials
        </Link>
      </div>
    </div>
  )
}
