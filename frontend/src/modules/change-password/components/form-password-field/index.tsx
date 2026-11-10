import type { FieldValues } from 'react-hook-form'
import { Field, TextField } from '../../../../components/core'
import type { FormPasswordFieldProps } from '../../common/types/change-password'
import styles from './style.module.scss'

export function FormPasswordField<TFieldValues extends FieldValues>({
  control,
  label,
  name,
  ...props
}: FormPasswordFieldProps<TFieldValues>) {
  return (
    <Field
      control={control}
      name={name}
      label={label}
      required
    >
      <TextField
        {...props}
        id={name}
        className={styles.field}
        inputClassName={styles.textField}
        type="password"
        fullWidth
      />
    </Field>
  )
}
