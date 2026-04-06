'use client'

import { cn } from '@/utilities/ui'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as LabelPrimitive from '@radix-ui/react-label'
import { Check } from 'lucide-react'
import * as React from 'react'

const Checkbox: React.FC<
  {
    ref?: React.Ref<HTMLButtonElement>
  } & React.ComponentProps<typeof CheckboxPrimitive.Root>
> = ({ className, ref, ...props }) => (
  <CheckboxPrimitive.Root
    className={cn(
      'peer h-4 w-4 shrink-0 rounded border border-primary ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      className,
    )}
    ref={ref}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
)

interface CheckboxFieldProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  label: string
  id: string
  ref?: React.Ref<HTMLButtonElement>
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, id, ref, ...props }) => (
  <LabelPrimitive.Root
    htmlFor={id}
    className="flex min-h-[44px] cursor-pointer items-center gap-3 font-body text-base font-normal leading-snug"
  >
    <Checkbox id={id} ref={ref} {...props} />
    {label}
  </LabelPrimitive.Root>
)

export { Checkbox, CheckboxField }
