import type { ReactNode } from 'react'
import { Footer } from '../footer'
import { Header } from '../header'
import styles from './style.module.scss'

type SiteLayoutProps = {
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
