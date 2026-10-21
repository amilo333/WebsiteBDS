import { Alert, Box, Snackbar, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import { AppButton } from '../../../../components/core'
import { useLoginForm } from '../../common'
import styles from './style.module.scss'

export function LoginForm() {
  const {
    closeError,
    control,
    errorMessage,
    isSubmitting,
    submit,
  } = useLoginForm()

  return (
    <Box className={styles.panel}>
      <Typography component="h1" className={styles.title}>
        Đăng nhập
      </Typography>
      <Typography className={styles.description}>
        Đăng nhập để quản lý thông tin tài khoản và đổi mật khẩu.
      </Typography>

      <Box component="form" noValidate onSubmit={submit} className={styles.form}>
        <Controller
          control={control}
          name="username"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Tài khoản"
              placeholder="Nhập email hoặc tên đăng nhập"
              autoComplete="username"
              fullWidth
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message ?? ' '}
              className={styles.field}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              type="password"
              autoComplete="current-password"
              fullWidth
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message ?? ' '}
              className={styles.field}
            />
          )}
        />

        <AppButton
          gradient
          fullWidth
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </AppButton>
      </Box>

      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={3600}
        onClose={closeError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled" onClose={closeError}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}
