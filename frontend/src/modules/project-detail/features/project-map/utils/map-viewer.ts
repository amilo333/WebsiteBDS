import type OpenSeadragon from 'openseadragon'
import type { ProjectMapUnit, UnitTypeFilter } from '../types'
import { UNIT_TYPE_FILTERS } from '../constants'

function normalizeFilterValue(value: string | null) {
  return value
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/gi, 'd')
    .trim()
    .replace(/[\s-]+/g, '_')
    .toUpperCase() ?? ''
}

export function matchesUnitType(unit: ProjectMapUnit, filter: UnitTypeFilter) {
  const option = UNIT_TYPE_FILTERS.find((item) => item.value === filter)
  if (!option) return false

  const unitValues = [
    normalizeFilterValue(unit.productTypeCode),
    normalizeFilterValue(unit.productType),
  ]
  return option.aliases.some((alias) => unitValues.includes(alias))
}

export function hasKnownUnitType(unit: ProjectMapUnit) {
  return UNIT_TYPE_FILTERS.some((filter) => matchesUnitType(unit, filter.value))
}

export function getNumericPrice(unit: ProjectMapUnit) {
  const value = typeof unit.price === 'number' ? unit.price : Number(unit.price)
  return Number.isFinite(value) && value > 0 ? value : Number.POSITIVE_INFINITY
}

export function getConfiguredZoomLevel(
  viewer: OpenSeadragon.Viewer,
  zoomMax: number,
) {
  const viewport = viewer.viewport
  const minZoom = viewport.getMinZoom()
  const maxZoom = viewport.getMaxZoom()
  const currentZoom = viewport.getZoom()

  if (maxZoom <= minZoom) return 0
  return ((currentZoom - minZoom) / (maxZoom - minZoom)) * zoomMax
}
