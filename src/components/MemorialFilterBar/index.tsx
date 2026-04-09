'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
  initialValues: { name: string; month: string; year: string }
}

const MONTHS = [
  { label: 'January', value: '1' },
  { label: 'February', value: '2' },
  { label: 'March', value: '3' },
  { label: 'April', value: '4' },
  { label: 'May', value: '5' },
  { label: 'June', value: '6' },
  { label: 'July', value: '7' },
  { label: 'August', value: '8' },
  { label: 'September', value: '9' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
]

// Sentinel value for "no selection" in Radix Select (empty string doesn't work)
const ALL = '_all'

function buildUrl(values: { name: string; month: string; year: string }) {
  const params = new URLSearchParams()
  if (values.name) params.set('name', values.name)
  if (values.month) params.set('month', values.month)
  if (values.year) params.set('year', values.year)
  const qs = params.toString()
  return qs ? `?${qs}` : '?'
}

export const MemorialFilterBar: React.FC<Props> = ({ initialValues }) => {
  const router = useRouter()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [name, setName] = useState(initialValues.name)
  const [month, setMonth] = useState(initialValues.month)
  const [year, setYear] = useState(initialValues.year)

  // Ref so debounce closure always sees latest state
  const stateRef = useRef({ name, month, year })
  useEffect(() => {
    stateRef.current = { name, month, year }
  }, [name, month, year])

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 11 }, (_, i) => String(currentYear - i))

  const hasFilters = Boolean(name || month || year)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      router.push(buildUrl({ ...stateRef.current, name: value }))
    }, 300)
  }

  const handleMonthChange = (value: string) => {
    const next = value === ALL ? '' : value
    setMonth(next)
    router.push(buildUrl({ ...stateRef.current, month: next }))
  }

  const handleYearChange = (value: string) => {
    const next = value === ALL ? '' : value
    // Clearing year also clears month (month without year is meaningless)
    const nextMonth = next ? stateRef.current.month : ''
    setYear(next)
    if (!next) setMonth('')
    router.push(buildUrl({ ...stateRef.current, year: next, month: nextMonth }))
  }

  const handleClear = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    setName('')
    setMonth('')
    setYear('')
    router.push('?')
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return (
    <div className="border-b border-border bg-background">
      <div className="container py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
          {/* Name search */}
          <div className="flex-1 sm:max-w-xs">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Search
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                onChange={handleNameChange}
                placeholder="Search by name…"
                type="text"
                value={name}
              />
            </div>
          </div>

          {/* Month */}
          <div className="w-full sm:w-44">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Month
            </label>
            <Select onValueChange={handleMonthChange} value={month || ALL}>
              <SelectTrigger>
                <SelectValue placeholder="All months" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All months</SelectItem>
                {MONTHS.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year */}
          <div className="w-full sm:w-32">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Year
            </label>
            <Select onValueChange={handleYearChange} value={year || ALL}>
              <SelectTrigger>
                <SelectValue placeholder="All years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All years</SelectItem>
                {years.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Clear — only rendered when filters are active */}
          {hasFilters && (
            <Button className="sm:self-end" onClick={handleClear} size="default" variant="ghost">
              <X className="mr-1.5 h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
