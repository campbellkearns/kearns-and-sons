import { cn } from '@/utilities/ui'
import { Label } from '@/components/ui/label'
import * as React from 'react'

interface FormFieldProps {
  label: string
  id: string
  error?: string
  children: React.ReactElement
  className?: string
}

const FormField: React.FC<FormFieldProps> = ({ label, id, error, children, className }) => {
  const errorId = `${id}-error`

  const child = React.cloneElement(children, {
    id,
    ...(error
      ? { 'aria-describedby': errorId, 'aria-invalid': true as const }
      : {}),
  })

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor={id}>{label}</Label>
      {child}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="font-body text-sm text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export { FormField }
export type { FormFieldProps }
