import { Alert, Box, CircularProgress, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { createUnitInquiry } from '../../api'
import {
  useMapFilters,
  useMapViewer,
  useProjectMap,
  useUnitSearch,
} from '../../hooks'
import type {
  CodeSuggestion,
  ProjectMapUnit,
  ProjectMapViewerProps,
} from '../../types'
import {
  getDziUrl,
  getMaxZoomLevel,
  normalizeProjectMapCodeUnits,
  normalizeProjectMapUnits,
} from '../../utils'
import { MapEyeToggle } from '../map-eye-toggle'
import { MapFilter } from '../map-filter'
import { MapSearch } from '../map-search'
import { UnitInfoCard } from '../unit-info-card'
import styles from '../../style.module.scss'

export function DziViewer({ projectId }: ProjectMapViewerProps) {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchError, setSearchError] = useState<string | null>(null)
  const [debouncedKeyword, setDebouncedKeyword] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [selectedUnit, setSelectedUnit] = useState<ProjectMapUnit | null>(null)
  const [requestedUnitCodes, setRequestedUnitCodes] = useState<string[]>([])
  const {
    mapConfig,
    unitsData,
    isPending,
    isError,
    error,
  } = useProjectMap(projectId)
  const units = useMemo(
    () => normalizeProjectMapUnits(unitsData),
    [unitsData],
  )
  const allMapUnits = useMemo(
    () => normalizeProjectMapCodeUnits(unitsData),
    [unitsData],
  )
  const {
    showAllUnits,
    setShowAllUnits,
    hotEnabled,
    setHotEnabled,
    typeFilters,
    visibleUnits,
    visibleUnitIds,
    toggleTypeFilter,
  } = useMapFilters(units)
  const codeSearchQuery = useUnitSearch(projectId, debouncedKeyword)
  const codeSuggestions = useMemo<CodeSuggestion[]>(
    () => (codeSearchQuery.data ?? []).slice(0, 10).map((code) => ({
      code,
      unit: allMapUnits.find((unit) => (
        unit.code.localeCompare(code, undefined, { sensitivity: 'base' }) === 0
      )) ?? null,
    })),
    [allMapUnits, codeSearchQuery.data],
  )
  const inquiryMutation = useMutation({
    mutationFn: createUnitInquiry,
    onSuccess: (_data, variables) => {
      setRequestedUnitCodes((currentCodes) => currentCodes.includes(variables.unitCode)
        ? currentCodes
        : [...currentCodes, variables.unitCode])
    },
  })
  const dziUrl = getDziUrl(mapConfig)
  const {
    viewerElementRef,
    viewerError,
    focusMapUnit,
    clearFocusedUnit,
  } = useMapViewer({
    dziUrl,
    maxZoomLevel: getMaxZoomLevel(mapConfig),
    defaultZoomLevel: mapConfig?.desktopZoomDefault ?? 1,
    focusZoomLevel: mapConfig?.desktopFocusZoom ?? 10,
    configuredZoomMax: mapConfig?.desktopZoomMax ?? 200,
    markerLimit: mapConfig?.countUnitViewport ?? 50,
    units,
    visibleUnitIds,
    markersEnabled: showAllUnits,
    setMarkersEnabled: setShowAllUnits,
    setSelectedUnit,
  })

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedKeyword(searchKeyword)
    }, 40)
    return () => window.clearTimeout(timeoutId)
  }, [searchKeyword])

  function selectSearchUnit({ code, unit }: CodeSuggestion) {
    setSearchKeyword(code)
    setDebouncedKeyword(code)
    setIsSearchFocused(false)
    setSearchError(null)

    if (unit) {
      focusMapUnit(unit)
      return
    }
    setSearchError(`Chưa có dữ liệu tọa độ cho căn ${code}.`)
  }

  function closeUnitDetail() {
    clearFocusedUnit()
    setSelectedUnit(null)
  }

  if (isPending) {
    return (
      <Box className={styles.feedback} role="status" aria-live="polite">
        <CircularProgress size={34} />
        <Typography>Đang tải bản đồ và quỹ căn...</Typography>
      </Box>
    )
  }

  if (isError) {
    return (
      <Box className={styles.feedback}>
        <Alert severity="error">
          {error instanceof Error
            ? error.message
            : 'Không thể tải dữ liệu bản đồ dự án.'}
        </Alert>
      </Box>
    )
  }

  if (!dziUrl) {
    return (
      <Box className={styles.feedback}>
        <Alert severity="info">Dự án chưa có file bản đồ DZI.</Alert>
      </Box>
    )
  }

  return (
    <div className={styles.mapShell}>
      <MapSearch
        keyword={searchKeyword}
        searchError={searchError}
        isSearchFocused={isSearchFocused}
        isFetching={codeSearchQuery.isFetching}
        suggestions={codeSuggestions}
        onKeywordChange={(keyword) => {
          setSearchKeyword(keyword)
          setSearchError(null)
        }}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => window.setTimeout(() => setIsSearchFocused(false), 120)}
        onSelect={selectSearchUnit}
      />

      <MapFilter
        hotEnabled={hotEnabled}
        typeFilters={typeFilters}
        onToggleHot={() => setHotEnabled((current) => !current)}
        onToggleType={toggleTypeFilter}
      />

      <div className={styles.viewerWrap}>
        <div
          ref={viewerElementRef}
          className={styles.viewer}
          aria-label="Bản đồ mặt bằng dự án có thể phóng to và kéo"
        />

        <MapEyeToggle
          isVisible={showAllUnits}
          onToggle={() => setShowAllUnits((current) => !current)}
        />

        {selectedUnit && (
          <UnitInfoCard
            unit={selectedUnit}
            hasRequested={requestedUnitCodes.includes(selectedUnit.code)}
            isRequesting={inquiryMutation.isPending}
            hasRequestError={inquiryMutation.isError}
            onClose={closeUnitDetail}
            onRequestInformation={() => inquiryMutation.mutate({
              projectId,
              unitCode: selectedUnit.code,
            })}
          />
        )}

        {!showAllUnits && (
          <Alert severity="info" className={styles.filterEmpty}>
            Tất cả các căn trên bản đồ đang được ẩn.
          </Alert>
        )}

        {showAllUnits && visibleUnits.length === 0 && (
          <Alert severity="info" className={styles.filterEmpty}>
            Không có căn Còn hàng phù hợp với bộ lọc.
          </Alert>
        )}

        {viewerError && (
          <Alert severity="error" className={styles.viewerError}>
            {viewerError}
          </Alert>
        )}
      </div>
    </div>
  )
}
