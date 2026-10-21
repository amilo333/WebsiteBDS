import { ButtonBase, Typography } from '@mui/material'
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined'
import type { SectionTabsProps, TabItem } from '../../common/types/project'
import styles from './style.module.scss'

const tabs: TabItem[] = [
  {
    key: 'overview',
    label: 'Tổng quan',
    icon: HomeWorkOutlinedIcon,
    href: '#tong-quan',
  },
  { key: 'location', label: 'Vị trí', icon: PlaceOutlinedIcon, href: '#vi-tri' },
  { key: 'zones', label: 'Phân khu', icon: ApartmentOutlinedIcon, href: '#phan-khu' },
  {
    key: 'floorplan',
    label: 'Mặt bằng quỹ căn',
    icon: MapOutlinedIcon,
    href: '#mat-bang',
  },
  { key: 'scale', label: 'Quy mô', icon: LandscapeOutlinedIcon, href: '#quy-mo' },
  {
    key: 'policy',
    label: 'Chính sách bán hàng',
    icon: DescriptionOutlinedIcon,
    href: '#chinh-sach',
  },
  { key: 'news', label: 'Tin tức', icon: NewspaperOutlinedIcon, href: '#tin-tuc' },
]

export function SectionTabs({ active }: SectionTabsProps) {
  return (
    <nav className={styles.tabs} aria-label="Các mục nội dung dự án">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const selected = active === tab.key

        return (
          <ButtonBase
            key={tab.key}
            component="a"
            href={tab.href}
            className={`${styles.tab} ${selected ? styles.active : ''}`}
            aria-current={selected ? 'page' : undefined}
          >
            <Icon className={styles.icon} />
            <Typography component="span" className={styles.label}>
              {tab.label}
            </Typography>
          </ButtonBase>
        )
      })}
    </nav>
  )
}
