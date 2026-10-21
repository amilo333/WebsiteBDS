import { Box, Container } from '@mui/material'
import { SiteLayout } from '../../components/layouts'
import { LoginForm } from '../../modules/auth'
import styles from './style.module.scss'

export function LoginPage() {
  return (
    <SiteLayout footerClassName={styles.footer}>
      <Box className={styles.page}>
        <Container className={styles.container}>
          <LoginForm />
        </Container>
      </Box>
    </SiteLayout>
  )
}
