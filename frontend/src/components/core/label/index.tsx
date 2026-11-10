import { FormLabel as MuiFormLabel } from '@mui/material'
import type { LabelProps } from './type'
import styles from './style.module.scss'

export function Label({ className, ...props }: LabelProps) {
  const labelClassName = [styles.label, className].filter(Boolean).join(' ')

  return <MuiFormLabel {...props} className={labelClassName} />
}

export type { LabelProps } from './type'
