import type { TextFieldProps } from '@mui/material'
import type { z } from 'zod'
import type {
  Control,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import type { changePasswordSchema } from '../schemas/change-password-schema'

export type ChangePasswordRequest = {
  oldPassword: string
  newPassword: string
}

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>

export type ChangePasswordError = {
  message?: string
}

export type FormPasswordFieldProps<TFieldValues extends FieldValues> = Omit<
  TextFieldProps,
  'defaultValue' | 'label' | 'name' | 'type'
> & {
  control: Control<TFieldValues>
  label: string
  name: FieldPath<TFieldValues>
}
