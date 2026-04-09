'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
  page: number
  totalPages: number
}

export const SearchParamPagination: React.FC<Props> = ({ page, totalPages }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const hasPrev = page > 1
  const hasNext = page < totalPages

  const navigate = (targetPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (targetPage === 1) {
      params.delete('page')
    } else {
      params.set('page', String(targetPage))
    }
    const qs = params.toString()
    router.push(qs ? `?${qs}` : '?')
  }

  return (
    <div className="my-12 flex items-center justify-center gap-3">
      <Button
        aria-disabled={!hasPrev || undefined}
        aria-label="Previous page"
        disabled={!hasPrev}
        onClick={() => hasPrev && navigate(page - 1)}
        size="icon"
        variant="outline"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>

      <Button
        aria-disabled={!hasNext || undefined}
        aria-label="Next page"
        disabled={!hasNext}
        onClick={() => hasNext && navigate(page + 1)}
        size="icon"
        variant="outline"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
