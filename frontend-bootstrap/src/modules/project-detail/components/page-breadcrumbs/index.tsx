import { Link as RouterLink } from 'react-router'
import type { PageBreadcrumbsProps } from '../../../../types/project'
import styles from './style.module.scss'

export function PageBreadcrumbs({ items }: PageBreadcrumbsProps) {
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
