import oceanCityHero from '../assets/projects/banner.png'
import oceanParkAerial from '../assets/projects/ocean-park-aerial.jpg'
import oceanParkMasterplan from '../assets/projects/ocean-park-masterplan.jpg'
import zoneCard from '../assets/projects/zone-card.jpg'
import zoneDetail from '../assets/projects/chitiet.png'
import type { ProjectData } from '../types/project'

export const project: ProjectData = {
  id: 'vinhomes-ocean-park-3',
  name: 'VINHOMES OCEAN PARK 3',
  tagline:
    'Theo dõi thông tin chi tiết và bảng giá, mặt bằng, tiến độ và chính sách bán hàng dự án VINHOMES OCEAN PARK 3.',
  heroImage: oceanCityHero,
  zones: [
    {
      id: 'zone-1',
      name: 'PHÂN KHU 1',
      image: oceanParkAerial,
      units: '2.500 căn',
      area: 'Từ 50m² đến 191,5m²',
    },
    {
      id: 'zone-2',
      name: 'PHÂN KHU 2',
      image: zoneCard,
      units: '2.100 căn',
      area: 'Từ 60m² đến 200m²',
    },
    {
      id: 'zone-3',
      name: 'PHÂN KHU 3',
      image: oceanParkMasterplan,
      units: '1.980 căn',
      area: 'Từ 56m² đến 180m²',
    },
    {
      id: 'zone-4',
      name: 'PHÂN KHU 4',
      image: zoneDetail,
      units: '2.250 căn',
      area: 'Từ 65m² đến 210m²',
    },
  ],
}
