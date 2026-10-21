import { Controller, type FieldValues } from 'react-hook-form'
import { TextField } from '@mui/material'
import type { FormPasswordFieldProps } from '../../common/types/change-password'
import styles from './style.module.scss'

export function FormPasswordField<TFieldValues extends FieldValues>({
  control,
  label,
  name,
  ...props
}: FormPasswordFieldProps<TFieldValues>) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={name}>
        {label} <span className={styles.required}>*</span>
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <TextField
            {...props}
            {...field}
            id={name}
            className={styles.textField}
            type="password"
            fullWidth
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message ?? ' '}
          />
        )}
      />
    </div>
  )
}
