import type { ProjectTabKey } from '../../../types/project'
import styles from './style.module.scss'

type TabItem = {
  key: ProjectTabKey
  label: string
  icon: string
  href: string
}

const tabs: TabItem[] = [
  { key: 'overview', label: 'Tổng quan', icon: 'bi-house-door', href: '#tong-quan' },
  { key: 'location', label: 'Vị trí', icon: 'bi-geo-alt', href: '#vi-tri' },
  { key: 'zones', label: 'Phân khu', icon: 'bi-buildings', href: '#phan-khu' },
  { key: 'floorplan', label: 'Mặt bằng quỹ căn', icon: 'bi-map', href: '#mat-bang' },
  { key: 'scale', label: 'Quy mô', icon: 'bi-bounding-box', href: '#quy-mo' },
  { key: 'policy', label: 'Chính sách bán hàng', icon: 'bi-file-earmark-text', href: '#chinh-sach' },
  { key: 'news', label: 'Tin tức', icon: 'bi-newspaper', href: '#tin-tuc' },
]

export function SectionTabs({ active }: { active: ProjectTabKey }) {
  return (
    <nav className={styles.tabs} aria-label="Các mục nội dung dự án">
      {tabs.map((tab) => (
        <a
          key={tab.key}
          href={tab.href}
          className={`${styles.tab} ${active === tab.key ? styles.active : ''}`}
          aria-current={active === tab.key ? 'page' : undefined}
        >
          <i className={`bi ${tab.icon}`} aria-hidden="true" />
          <span>{tab.label}</span>
        </a>
      ))}
    </nav>
  )
}
