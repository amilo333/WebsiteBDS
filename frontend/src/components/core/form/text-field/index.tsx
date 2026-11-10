'use client'

import { TextField as MuiTextField } from '@mui/material'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { Label } from '../../label'
import type { TTextFieldProps } from './type'
import styles from './style.module.scss'

export default function TextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  field,
  fieldState,
  label,
  required,
  className,
  inputClassName,
  error,
  helperText,
  id,
  ...props
}: TTextFieldProps<TFieldValues, TName>) {
  const inputId = id ?? field?.name
  const fieldProps = field
    ? {
        name: field.name,
        value: field.value,
        onBlur: field.onBlur,
        onChange: field.onChange,
      }
    : {}

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      {label && (
        <Label htmlFor={inputId} required={required}>
          {label}
        </Label>
      )}
      <MuiTextField
        {...fieldProps}
        {...props}
        id={inputId}
        required={required}
        className={inputClassName}
        inputRef={field?.ref}
        error={error ?? Boolean(fieldState?.error)}
        helperText={helperText ?? fieldState?.error?.message ?? ' '}
      />
    </div>
  )
}
