import type { ProjectMapConfig, ProjectMapUnit } from '../types'

type UnknownRecord = Record<string, unknown>

const AVAILABLE_STATUSES = [
  'available',
  'con hang',
  'dang ban',
  'on sale',
  'open',
]

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function stripVietnamese(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .trim()
    .toLowerCase()
}

function firstValue(record: UnknownRecord, keys: string[]) {
  for (const key of keys) {
    const value = record[key]
    if (value !== undefined && value !== null && value !== '') return value
  }
  return null
}

function toStringValue(value: unknown) {
  if (typeof value === 'string') return value.trim() || null
  if (typeof value === 'number') return String(value)
  if (isRecord(value)) {
    return toStringValue(firstValue(value, ['name', 'label', 'code', 'value']))
  }
  return null
}

function toNumber(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }
  return null
}

function toBoolean(value: unknown) {
  if (typeof value === 'boolean') return value
  if (typeof value === 'number') return value === 1
  if (typeof value === 'string') {
    return ['true', '1', 'yes', 'hot'].includes(value.trim().toLowerCase())
  }
  return false
}

function unwrapUnit(record: UnknownRecord) {
  for (const key of ['product', 'unit', 'apartment', 'realEstate']) {
    const nested = record[key]
    if (isRecord(nested)) return { ...nested, ...record }
  }
  return record
}

function normalizeStatusCode(status: string | null) {
  if (!status) return null

  const normalizedStatus = stripVietnamese(status)
  if (AVAILABLE_STATUSES.some((item) => normalizedStatus.includes(item))) {
    return 'AVAILABLE'
  }
  if (normalizedStatus === 'sold' || normalizedStatus.includes('da ban')) {
    return 'SOLD'
  }
  return status.trim().toUpperCase()
}

function normalizeUnit(
  value: unknown,
  index: number,
  availableOnly: boolean,
): ProjectMapUnit | null {
  if (!isRecord(value)) return null

  const record = unwrapUnit(value)
  const coordinates = firstValue(record, [
    'coordinates',
    'coordinate',
    'position',
    'location',
    'mapPosition',
  ])
  const coordinateRecord = isRecord(coordinates) ? coordinates : {}
  const x = toNumber(firstValue({ ...coordinateRecord, ...record }, [
    'imgX',
    'xPixel',
    'x',
    'mapX',
    'positionX',
    'coordinateX',
    'xCoordinate',
  ]))
  const y = toNumber(firstValue({ ...coordinateRecord, ...record }, [
    'imgY',
    'yPixel',
    'y',
    'mapY',
    'positionY',
    'coordinateY',
    'yCoordinate',
  ]))

  if (x === null || y === null) return null

  const statusCode = normalizeStatusCode(toStringValue(firstValue(record, [
    'statusCode',
    'status',
    'productStatus',
    'inventoryStatus',
  ])) ?? toStringValue(firstValue(record, [
    'statusName',
    'productStatusName',
  ])))

  if (availableOnly && statusCode !== 'AVAILABLE') return null

  const code = toStringValue(firstValue(record, [
    'code',
    'unitCode',
    'productCode',
    'apartmentCode',
    'name',
  ])) ?? `Căn ${index + 1}`
  const id = `map-unit-${code.toLocaleUpperCase('vi-VN')}`
  const areaValue = firstValue(record, [
    'areaLand',
    'area',
    'usableArea',
    'carpetArea',
    'builtUpArea',
  ])
  const priceValue = firstValue(record, [
    'basePrice',
    'price',
    'sellingPrice',
    'currentPrice',
    'totalPrice',
  ])
  const loanPriceValue = firstValue(record, ['loanPrice', 'mortgagePrice'])

  return {
    id,
    code,
    area: typeof areaValue === 'number' || typeof areaValue === 'string'
      ? areaValue
      : null,
    productType: toStringValue(firstValue(record, [
      'productTypeName',
      'propertyTypeName',
      'unitTypeName',
      'typeName',
      'productType',
    ])),
    productTypeCode: toStringValue(firstValue(record, [
      'unitTypeCode',
      'productTypeCode',
      'propertyTypeCode',
      'typeCode',
    ])),
    price: typeof priceValue === 'number' || typeof priceValue === 'string'
      ? priceValue
      : null,
    loanPrice: typeof loanPriceValue === 'number'
      || typeof loanPriceValue === 'string'
      ? loanPriceValue
      : null,
    isHot: toBoolean(firstValue(record, ['isHot', 'hot', 'isFeatured'])),
    statusCode,
    status: statusCode === 'AVAILABLE'
      ? 'Còn hàng'
      : statusCode
        ? 'Đã bán'
        : 'Quỹ hàng Ẩn',
    inquiryStatusCode: toStringValue(record.inquiryStatusCode)?.toUpperCase()
      ?? null,
    inquiryStatusName: toStringValue(record.inquiryStatusName),
    x,
    y,
  }
}

function normalizeUnits(data: unknown, availableOnly: boolean) {
  let values: unknown[] = []

  if (Array.isArray(data)) {
    values = data
  } else if (isRecord(data)) {
    const candidate = firstValue(data, ['content', 'items', 'results', 'data'])
    values = Array.isArray(candidate) ? candidate : [data]
  }

  return values
    .map((value, index) => normalizeUnit(value, index, availableOnly))
    .filter((unit): unit is ProjectMapUnit => unit !== null)
}

export function getDziUrl(config?: ProjectMapConfig) {
  return config?.dziKey ?? null
}

export function getMaxZoomLevel(config?: ProjectMapConfig) {
  const value = Number(config?.totalTiles)
  return Number.isFinite(value) && value > 0 ? value : undefined
}

export function normalizeProjectMapUnits(data: unknown) {
  return normalizeUnits(data, true)
}

export function normalizeProjectMapCodeUnits(data: unknown) {
  return normalizeUnits(data, false)
}

export function formatProjectMapArea(area: number | string | null) {
  if (area === null || area === '') return 'Chưa cập nhật'
  if (typeof area === 'string' && /m(?:2|²)/i.test(area)) return area
  return `${area} m²`
}

export function formatCompactProjectMapPrice(price: number | string | null) {
  if (price === null || price === '') return 'Liên hệ'

  const numericPrice = typeof price === 'number' ? price : Number(price)
  if (!Number.isFinite(numericPrice) || numericPrice <= 0) return String(price)

  const billionsRoundedDown = Math.floor(numericPrice / 10_000_000) / 100
  return `${new Intl.NumberFormat('vi-VN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(billionsRoundedDown)} tỷ`
}
