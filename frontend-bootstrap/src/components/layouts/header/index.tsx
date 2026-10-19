import { useState } from 'react'
import { Link as RouterLink } from 'react-router'
import { BrandLogo } from '../../core'
import styles from './style.module.scss'

const navigation = [
  { label: 'GIỚI THIỆU', href: '#gioi-thieu' },
  { label: 'DỰ ÁN', href: '/du-an/vinhomes-ocean-park-3' },
  { label: 'TIN TỨC', href: '#tin-tuc' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={`${styles.bar} navbar navbar-expand-md p-0`}>
          <RouterLink
            to="/du-an/vinhomes-ocean-park-3"
            className={styles.brandLink}
            aria-label="Trang chủ"
          >
            <BrandLogo />
          </RouterLink>

          <nav
            id="primary-navigation"
            className={`${styles.navigation} ${open ? styles.navigationOpen : ''}`}
            aria-label="Điều hướng chính"
          >
            {navigation.map((item) =>
              item.href.startsWith('/') ? (
                <RouterLink key={item.label} to={item.href} className={styles.navLink} onClick={() => setOpen(false)}>
                  {item.label}
                </RouterLink>
              ) : (
                <a key={item.label} href={item.href} className={styles.navLink} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              ),
            )}
          </nav>

          <div className="d-flex align-items-center gap-2 gap-lg-3 ms-auto">
            <span className={styles.online}>
              <span className={styles.onlineDot} aria-hidden="true" />
              <span>100 người đang Online</span>
            </span>
            <button type="button" className={styles.accountButton} aria-label="Tài khoản">
              <i className="bi bi-person" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`${styles.menuButton} d-md-none`}
              aria-expanded={open}
              aria-controls="primary-navigation"
              aria-label={open ? 'Đóng menu' : 'Mở menu'}
              onClick={() => setOpen((current) => !current)}
            >
              <i className={`bi ${open ? 'bi-x-lg' : 'bi-list'}`} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
