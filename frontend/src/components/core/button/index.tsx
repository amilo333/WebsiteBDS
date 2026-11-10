import {
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
} from '@mui/material'
import styles from './style.module.scss'

export type ButtonProps = MuiButtonProps & {
  gradient?: boolean
}

export function Button({ gradient = false, className, ...props }: ButtonProps) {
  const buttonClassName = [styles.button, gradient ? styles.gradient : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <MuiButton
      {...props}
      className={buttonClassName}
    />
  )
}
