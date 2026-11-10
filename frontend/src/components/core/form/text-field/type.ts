import type { TextFieldProps as MuiTextFieldProps } from '@mui/material'
import type { FieldPath, FieldValues } from 'react-hook-form'
import type { TFieldState } from '../field/type'

export type TTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Partial<TFieldState<TFieldValues, TName>> &
  Omit<
    MuiTextFieldProps,
    'className' | 'label' | 'name' | 'onBlur' | 'onChange' | 'value'
  > & {
    label?: string
    className?: string
    inputClassName?: string
  }
