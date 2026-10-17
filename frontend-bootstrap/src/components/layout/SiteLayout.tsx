import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import styles from './SiteLayout.module.css'

interface SiteLayoutProps {
  children: ReactNode
  showFooter?: boolean
}

export function SiteLayout({ children, showFooter = true }: SiteLayoutProps) {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>{children}</main>
      {showFooter && <Footer />}
    </div>
  )
}
