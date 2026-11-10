import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { Button, Field, TextField } from '../../../../../../components/core'
import { useLoginForm } from '../../../../../auth'
import type { ProjectLoginFormProps } from '../../types'
import styles from './style.module.scss'

export function ProjectLoginForm({ onSuccess }: ProjectLoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberLogin, setRememberLogin] = useState(false)
  const {
    closeError,
    control,
    errorMessage,
    isSubmitting,
    submit,
  } = useLoginForm({ onSuccess, redirectTo: null })

  return (
    <Box className={styles.card}>
      <Typography component="h2" className={styles.title}>
        Đăng nhập
      </Typography>
      <Typography className={styles.description}>
        Vui lòng đăng nhập để xem nội dung
      </Typography>

      <Box component="form" noValidate onSubmit={submit} className={styles.form}>
        <Field control={control} name="username">
          <TextField
            placeholder="Email/ Số điện thoại"
            autoComplete="username"
            fullWidth
            inputClassName={styles.input}
          />
        </Field>

        <Field control={control} name="password">
          <TextField
            placeholder="Mật khẩu"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            fullWidth
            inputClassName={styles.input}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                      edge="end"
                      size="small"
                      onClick={() => setShowPassword((current) => !current)}
                    >
                      {showPassword
                        ? <VisibilityOffOutlinedIcon />
                        : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Field>

        <Box className={styles.options}>
          <FormControlLabel
            className={styles.remember}
            control={(
              <Checkbox
                size="small"
                checked={rememberLogin}
                onChange={(_, checked) => setRememberLogin(checked)}
              />
            )}
            label="Đăng nhập tự động"
          />
          <button type="button" className={styles.textButton}>
            Quên mật khẩu?
          </button>
        </Box>

        {errorMessage && (
          <Alert severity="error" onClose={closeError} className={styles.alert}>
            {errorMessage}
          </Alert>
        )}

        <Button
          gradient
          fullWidth
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>
      </Box>

      <Typography className={styles.registerText}>
        Bạn chưa có tài khoản?{' '}
        <button type="button" className={styles.textButton}>
          Đăng ký ngay
        </button>
      </Typography>
    </Box>
  )
}
