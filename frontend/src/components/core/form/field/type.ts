import type React from 'react'
import type {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  PathValue,
  UseFormStateReturn,
} from 'react-hook-form'

export type TFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>
  name: TName
  label?: string
  defaultValue?: PathValue<TFieldValues, TName>
  required?: boolean
  children: React.ReactElement | TRenderFieldFunction<TFieldValues, TName>
}

export type TRenderFieldFunction<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = (form: TFieldState<TFieldValues, TName>) => React.ReactElement

export type TFieldState<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<TFieldValues>
}
