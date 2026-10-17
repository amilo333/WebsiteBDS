import type { ElementType } from 'react'
import { Box, ButtonBase, Typography } from '@mui/material'
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined'
import type { ProjectTabKey } from '../../types/project'

interface TabItem {
  key: ProjectTabKey
  label: string
  icon: ElementType
  href: string
}

const tabs: TabItem[] = [
  { key: 'overview', label: 'Tổng quan', icon: HomeWorkOutlinedIcon, href: '#tong-quan' },
  { key: 'location', label: 'Vị trí', icon: PlaceOutlinedIcon, href: '#vi-tri' },
  { key: 'zones', label: 'Phân khu', icon: ApartmentOutlinedIcon, href: '#phan-khu' },
  { key: 'floorplan', label: 'Mặt bằng quỹ căn', icon: MapOutlinedIcon, href: '#mat-bang' },
  { key: 'scale', label: 'Quy mô', icon: LandscapeOutlinedIcon, href: '#quy-mo' },
  { key: 'policy', label: 'Chính sách bán hàng', icon: DescriptionOutlinedIcon, href: '#chinh-sach' },
  { key: 'news', label: 'Tin tức', icon: NewspaperOutlinedIcon, href: '#tin-tuc' },
]

export function SectionTabs({ active }: { active: ProjectTabKey }) {
  return (
    <Box
      component="nav"
      aria-label="Các mục nội dung dự án"
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        p: 0.75,
        borderRadius: 1.5,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        background: 'linear-gradient(100deg, #2853c6 0%, #00b8d5 100%)',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon
        const selected = active === tab.key
        return (
          <ButtonBase
            key={tab.key}
            component="a"
            href={tab.href}
            sx={{
              flex: { md: 1 },
              minWidth: { xs: 142, md: 0 },
              px: 1.4,
              py: 1.25,
              borderRadius: 1.25,
              color: '#fff',
              bgcolor: selected ? 'rgba(30,82,198,.72)' : 'transparent',
              transition: 'background-color .2s ease',
              '&:hover': { bgcolor: 'rgba(255,255,255,.12)' },
            }}
          >
            <Icon sx={{ fontSize: 17, mr: 0.9 }} />
            <Typography sx={{ fontSize: { xs: 11.5, md: 11 }, whiteSpace: 'nowrap', fontWeight: 600 }}>
              {tab.label}
            </Typography>
          </ButtonBase>
        )
      })}
    </Box>
  )
}
