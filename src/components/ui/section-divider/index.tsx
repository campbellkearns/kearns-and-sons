import { cn } from '@/utilities/ui'
import * as React from 'react'

const SectionDivider: React.FC<React.HTMLAttributes<HTMLHRElement>> = ({ className, ...props }) => (
  <hr
    aria-hidden="true"
    className={cn('border-0 h-px w-full bg-accent opacity-60', className)}
    {...props}
  />
)

export { SectionDivider }
