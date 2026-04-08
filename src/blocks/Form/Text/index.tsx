import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { FormField } from '@/components/ui/form-field'
import React from 'react'

import { Width } from '../Width'

export const Text: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  return (
    <Width width={width}>
      <FormField
        label={`${label}${required ? ' *' : ''}`}
        id={name}
        error={errors[name] ? 'This field is required' : undefined}
      >
        <Input defaultValue={defaultValue} type="text" {...register(name, { required })} />
      </FormField>
    </Width>
  )
}
