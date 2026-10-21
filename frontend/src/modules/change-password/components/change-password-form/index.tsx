import { Alert, Box, Snackbar, Typography } from '@mui/material'
import { AppButton } from '../../../../components/core'
import { useChangePasswordForm } from '../../common'
import { FormPasswordField } from '../form-password-field'
import styles from './style.module.scss'

export function ChangePasswordForm() {
  const {
    closeError,
    closeSuccess,
    control,
    errorMessage,
    isSubmitting,
    submit,
    successOpen,
  } = useChangePasswordForm()

  return (
    <>
      <Box className={styles.panel}>
        <Typography component="h1" className={styles.title}>
          Đổi mật khẩu
        </Typography>

        <Box component="form" noValidate onSubmit={submit} className={styles.form}>
          <FormPasswordField
            control={control}
            name="currentPassword"
            label="Mật khẩu cũ"
            placeholder="Nhập mật khẩu cũ"
            autoComplete="current-password"
          />
          <FormPasswordField
            control={control}
            name="newPassword"
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            autoComplete="new-password"
          />
          <FormPasswordField
            control={control}
            name="confirmPassword"
            label="Nhập lại mật khẩu mới"
            placeholder="Nhập lại mật khẩu mới"
            autoComplete="new-password"
          />

          <AppButton
            gradient
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
          </AppButton>
        </Box>
      </Box>

      <Snackbar
        open={successOpen}
        autoHideDuration={2600}
        onClose={closeSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={closeSuccess}>
          Mật khẩu đã được cập nhật
        </Alert>
      </Snackbar>

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
    </>
  )
}
