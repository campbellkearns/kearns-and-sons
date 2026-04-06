import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const badgeVariants = cva(
  'inline-flex items-center rounded px-2.5 py-0.5 font-body text-sm uppercase tracking-wider',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        // navy bg / white text — passes ≥7:1
        default: 'bg-primary text-primary-foreground',
        // light steel bg / navy text — passes ≥7:1
        subtle: 'bg-secondary text-secondary-foreground',
        // warm gold bg / deep navy text — passes ≥6:1
        // Note: text-accent-foreground (white on gold) fails 4.5:1; text-foreground used instead
        accent: 'bg-accent text-foreground',
      },
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge: React.FC<BadgeProps> = ({ className, variant, ...props }) => (
  <span className={cn(badgeVariants({ variant }), className)} {...props} />
)

export { Badge, badgeVariants }
