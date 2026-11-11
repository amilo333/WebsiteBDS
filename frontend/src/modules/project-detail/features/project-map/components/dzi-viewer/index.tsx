import { Alert, Box, CircularProgress, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Pagination } from '../../../../../../components/core'
import { createUnitInquiry, searchProjectMapUnits } from '../../api'
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
import styles from '../../style.module.scss'

export function DziViewer({ projectId }: ProjectMapViewerProps) {
  const navigate = useNavigate()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchError, setSearchError] = useState<string | null>(null)
  const [mapClickError, setMapClickError] = useState<string | null>(null)
  const [debouncedKeyword, setDebouncedKeyword] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchedUnits, setSearchedUnits] = useState<ProjectMapUnit[]>([])
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
  const searchableUnits = useMemo(() => {
    const unitsByCode = new Map<string, ProjectMapUnit>()
    for (const unit of [...allMapUnits, ...searchedUnits]) {
      unitsByCode.set(unit.code.toLocaleUpperCase('vi-VN'), unit)
    }
    return Array.from(unitsByCode.values())
  }, [allMapUnits, searchedUnits])
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
      unit: searchableUnits.find((unit) => (
        unit.code.localeCompare(code, undefined, { sensitivity: 'base' }) === 0
      )) ?? null,
    })),
    [codeSearchQuery.data, searchableUnits],
  )
  const searchedUnitMutation = useMutation({
    mutationFn: (unitCode: string) => searchProjectMapUnits(projectId, {
      keyword: unitCode,
    }),
  })
  const nearestUnitMutation = useMutation({
    mutationFn: ({ imageX, imageY }: { imageX: number; imageY: number }) => (
      searchProjectMapUnits(projectId, { imageX, imageY })
    ),
  })
  const inquiryMutation = useMutation({
    mutationFn: createUnitInquiry,
  })
  const dziUrl = getDziUrl(mapConfig)
  const {
    viewerElementRef,
    viewerError,
    focusMapUnit,
    markerPagination,
    setMarkerPage,
  } = useMapViewer({
    dziUrl,
    maxZoomLevel: getMaxZoomLevel(mapConfig),
    defaultZoomLevel: mapConfig?.desktopZoomDefault ?? 1,
    focusZoomLevel: getMaxZoomLevel(mapConfig)
      ?? mapConfig?.desktopFocusZoom
      ?? 10,
    configuredZoomMax: mapConfig?.desktopZoomMax ?? 200,
    markerLimit: mapConfig?.countUnitViewport ?? 50,
    units,
    visibleUnitIds,
    markersEnabled: showAllUnits,
    setMarkersEnabled: setShowAllUnits,
    onOpenUnitDetail: (unit) => {
      navigate(`/du-an/${projectId}/can/${encodeURIComponent(unit.code)}`)
    },
    onRequestInformation: async (unit) => {
      await inquiryMutation.mutateAsync({
        projectId,
        unitCode: unit.code,
      })
    },
    onSearchNearestUnit: async (imageX, imageY) => {
      setMapClickError(null)
      try {
        const result = await nearestUnitMutation.mutateAsync({ imageX, imageY })
        const nearestUnit = normalizeProjectMapCodeUnits(result)[0] ?? null
        if (!nearestUnit) {
          setMapClickError('Không tìm thấy căn tại vị trí đã chọn.')
          return null
        }

        setSearchedUnits((current) => [
          ...current.filter((item) => (
            item.code.localeCompare(nearestUnit.code, undefined, {
              sensitivity: 'base',
            }) !== 0
          )),
          nearestUnit,
        ])
        return nearestUnit
      } catch {
        setMapClickError('Không thể tải thông tin căn tại vị trí đã chọn.')
        return null
      }
    },
  })

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedKeyword(searchKeyword)
    }, 40)
    return () => window.clearTimeout(timeoutId)
  }, [searchKeyword])

  async function selectSearchUnit({ code, unit }: CodeSuggestion) {
    setSearchKeyword(code)
    setDebouncedKeyword(code)
    setIsSearchFocused(false)
    setSearchError(null)

    if (unit) {
      focusMapUnit(unit)
      return
    }

    try {
      const result = await searchedUnitMutation.mutateAsync(code)
      const searchedUnit = normalizeProjectMapCodeUnits(result).find((item) => (
        item.code.localeCompare(code, undefined, { sensitivity: 'base' }) === 0
      ))

      if (!searchedUnit) {
        setSearchError(`Chưa có dữ liệu tọa độ cho căn ${code}.`)
        return
      }

      setSearchedUnits((current) => [
        ...current.filter((item) => (
          item.code.localeCompare(code, undefined, { sensitivity: 'base' }) !== 0
        )),
        searchedUnit,
      ])
      focusMapUnit(searchedUnit)
    } catch {
      setSearchError(`Không thể tải thông tin căn ${code}. Vui lòng thử lại.`)
    }
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
        isFetching={codeSearchQuery.isFetching || searchedUnitMutation.isPending}
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

        {showAllUnits && markerPagination.totalPages > 1 && (
          <div className={styles.markerPagination}>
            <span>
              Hiển thị {markerPagination.displayedItems}/{markerPagination.totalItems} căn
            </span>
            <Pagination
              page={markerPagination.page}
              count={markerPagination.totalPages}
              onChange={(_, page) => setMarkerPage(page)}
              shape="rounded"
              siblingCount={0}
            />
          </div>
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

        {mapClickError && (
          <Alert severity="error" className={styles.mapClickError}>
            {mapClickError}
          </Alert>
        )}
      </div>
    </div>
  )
}
