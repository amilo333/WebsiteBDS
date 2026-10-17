import type { ReactNode } from 'react'
import { Box } from '@mui/material'
import { Header } from './Header'
import { Footer } from './Footer'

interface SiteLayoutProps {
  children: ReactNode
  showFooter?: boolean
}

export function SiteLayout({ children, showFooter = true }: SiteLayoutProps) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box component="main" sx={{ flex: 1 }}>{children}</Box>
      {showFooter && <Footer />}
    </Box>
  )
}
