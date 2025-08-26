import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Kearns & Sons Logo Marker"
      width={200}
      height={200}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[18.75rem] w-full', className)}
      src="assets/logo.svg"
    />
  )
}
