import { Button, type ButtonProps } from '@mui/material'
import styles from './style.module.scss'

type AppButtonProps = ButtonProps & {
  gradient?: boolean
}

export function AppButton({ gradient = false, className, ...props }: AppButtonProps) {
  const buttonClassName = [styles.button, gradient ? styles.gradient : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <Button
      {...props}
      className={buttonClassName}
    />
  )
}
