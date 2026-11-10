'use client'

import React from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type { TFieldProps } from './type'

export default function Field<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: TFieldProps<TFieldValues, TName>) {
  const { control, name, defaultValue, label, required, children } = props

  return (
    <Controller
      control={control}
      name={name}
      {...(defaultValue !== undefined && { defaultValue })}
      render={({ field, fieldState, formState }) => (
        <>
          {typeof children === 'function'
            ? children({ field, fieldState, formState })
            : React.isValidElement(children)
              ? React.cloneElement(children, {
                  label,
                  field,
                  fieldState,
                  required,
                } as Record<string, unknown>)
              : null}
        </>
      )}
    />
  )
}
