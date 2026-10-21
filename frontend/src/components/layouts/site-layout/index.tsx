import type { ReactNode } from 'react'
import { Box } from '@mui/material'
import { Header } from '../header'
import { Footer } from '../footer'

type SiteLayoutProps = {
  children: ReactNode
  footerClassName?: string
  showFooter?: boolean
}

export function SiteLayout({ children, footerClassName, showFooter = true }: SiteLayoutProps) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box component="main" sx={{ flex: 1 }}>{children}</Box>
      {showFooter && <Footer className={footerClassName} />}
    </Box>
  )
}
