import { Link as RouterLink } from 'react-router-dom'
import styles from './PageBreadcrumbs.module.css'

interface BreadcrumbItem {
  label: string
  href?: string
}

export function PageBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className={styles.wrapper} aria-label="Đường dẫn trang">
      <ol className="breadcrumb mb-0">
        {items.map((item, index) => (
          <li
            key={`${item.label}-${index}`}
            className={`breadcrumb-item ${index === items.length - 1 ? 'active' : ''}`}
            aria-current={index === items.length - 1 ? 'page' : undefined}
          >
            {item.href ? <RouterLink to={item.href}>{item.label}</RouterLink> : item.label}
          </li>
        ))}
      </ol>
    </nav>
  )
}
