import type { UnitTypeFilterOption } from '../types'

export const MARKER_DETAIL_ZOOM_LEVEL = 100

export const INQUIRY_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Chờ Admin liên hệ',
  COMPLETED: 'Admin đã gửi thông tin',
  REJECTED: 'Admin từ chối yêu cầu',
  EXPIRE: 'Hết hạn',
}

export const UNIT_TYPE_FILTERS: UnitTypeFilterOption[] = [
  {
    value: 'DETACHED',
    label: 'Đơn lập',
    aliases: ['DETACHED', 'DON_LAP'],
  },
  {
    value: 'SEMI_DETACHED',
    label: 'Song lập',
    aliases: ['SEMI_DETACHED', 'SONG_LAP'],
  },
  {
    value: 'QUAD',
    label: 'Tứ lập',
    aliases: ['QUAD', 'QUAD_VILLA', 'QUADRUPLET', 'TU_LAP'],
  },
  {
    value: 'TOWNHOUSE',
    label: 'Liền kề',
    aliases: ['TOWNHOUSE', 'LIEN_KE'],
  },
  {
    value: 'SHOPHOUSE',
    label: 'Shophouse',
    aliases: ['SHOPHOUSE'],
  },
]
