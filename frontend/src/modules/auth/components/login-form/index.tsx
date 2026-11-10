import { Alert, Box, Snackbar, Typography } from '@mui/material'
import { Button, Field, TextField } from '../../../../components/core'
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
        <Field
          control={control}
          name="username"
          label="Tài khoản"
          required
        >
          <TextField
            placeholder="Nhập email hoặc tên đăng nhập"
            autoComplete="username"
            fullWidth
            inputClassName={styles.field}
          />
        </Field>
        <Field
          control={control}
          name="password"
          label="Mật khẩu"
          required
        >
          <TextField
            placeholder="Nhập mật khẩu"
            type="password"
            autoComplete="current-password"
            fullWidth
            inputClassName={styles.field}
          />
        </Field>

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
