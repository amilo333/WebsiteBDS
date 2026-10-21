import { Box, Breadcrumbs, Container, Link, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router'
import { SiteLayout } from '../../components/layouts'
import { AccountPanel, ChangePasswordForm } from '../../modules/change-password'
import styles from './style.module.scss'

export function ChangePasswordPage() {
  return (
    <SiteLayout footerClassName={styles.footer}>
      <Box className={styles.page}>
        <Container>
          <Breadcrumbs separator="/" aria-label="Đường dẫn trang" className={styles.breadcrumbs}>
            <Link component={RouterLink} to="/doi-mat-khau" className={styles.breadcrumbLink}>
              Thông tin cá nhân
            </Link>
            <Typography className={styles.breadcrumbCurrent}>Đổi mật khẩu</Typography>
          </Breadcrumbs>

          <Box className={styles.contentGrid}>
            <AccountPanel />
            <ChangePasswordForm />
          </Box>
        </Container>
      </Box>
    </SiteLayout>
  )
}
