import { useMemo, useState } from 'react'
import { UNIT_TYPE_FILTERS } from '../constants'
import type { ProjectMapUnit, UnitTypeFilter } from '../types'
import { hasKnownUnitType, matchesUnitType } from '../utils'

export function useMapFilters(units: ProjectMapUnit[]) {
  const [showAllUnits, setShowAllUnits] = useState(true)
  const [hotEnabled, setHotEnabled] = useState(true)
  const [typeFilters, setTypeFilters] = useState<UnitTypeFilter[]>(
    () => UNIT_TYPE_FILTERS.map((filter) => filter.value),
  )
  const visibleUnits = useMemo(
    () => units.filter((unit) => {
      if (!showAllUnits) return false
      if (!hotEnabled && unit.isHot) return false

      if (!hasKnownUnitType(unit)) {
        return typeFilters.length === UNIT_TYPE_FILTERS.length
      }

      return typeFilters.some((filter) => matchesUnitType(unit, filter))
    }),
    [hotEnabled, showAllUnits, typeFilters, units],
  )
  const visibleUnitIds = useMemo(
    () => new Set(visibleUnits.map((unit) => unit.id)),
    [visibleUnits],
  )

  function toggleTypeFilter(filter: UnitTypeFilter) {
    setTypeFilters((currentFilters) => currentFilters.includes(filter)
      ? currentFilters.filter((item) => item !== filter)
      : [...currentFilters, filter])
  }

  return {
    showAllUnits,
    setShowAllUnits,
    hotEnabled,
    setHotEnabled,
    typeFilters,
    visibleUnits,
    visibleUnitIds,
    toggleTypeFilter,
  }
}
