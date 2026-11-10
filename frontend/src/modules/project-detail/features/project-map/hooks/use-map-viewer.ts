import OpenSeadragon from 'openseadragon'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { MARKER_DETAIL_ZOOM_LEVEL } from '../constants'
import { createMarkerElement } from '../components/map-marker'
import type { ProjectMapUnit } from '../types'
import { getConfiguredZoomLevel, getNumericPrice } from '../utils'
import styles from '../style.module.scss'

type UseMapViewerOptions = {
  dziUrl: string | null
  maxZoomLevel?: number
  defaultZoomLevel: number
  focusZoomLevel: number
  configuredZoomMax: number
  markerLimit: number
  units: ProjectMapUnit[]
  visibleUnitIds: Set<string>
  markersEnabled: boolean
  setMarkersEnabled: Dispatch<SetStateAction<boolean>>
  setSelectedUnit: Dispatch<SetStateAction<ProjectMapUnit | null>>
}

export function useMapViewer({
  dziUrl,
  maxZoomLevel,
  defaultZoomLevel,
  focusZoomLevel,
  configuredZoomMax,
  markerLimit,
  units,
  visibleUnitIds,
  markersEnabled,
  setMarkersEnabled,
  setSelectedUnit,
}: UseMapViewerOptions) {
  const viewerElementRef = useRef<HTMLDivElement>(null)
  const markerElementsRef = useRef(new Map<string, HTMLButtonElement>())
  const markerLocationsRef = useRef(new Map<string, OpenSeadragon.Point>())
  const markerUnitsRef = useRef(new Map<string, ProjectMapUnit>())
  const visibleUnitIdsRef = useRef(new Set<string>())
  const markersEnabledRef = useRef(true)
  const focusedUnitIdRef = useRef<string | null>(null)
  const updateMarkerVisibilityRef = useRef<() => void>(() => undefined)
  const focusMapUnitRef = useRef<(unit: ProjectMapUnit) => void>(() => undefined)
  const [viewerError, setViewerError] = useState<string | null>(null)

  useEffect(() => {
    markersEnabledRef.current = markersEnabled
    visibleUnitIdsRef.current = visibleUnitIds
    updateMarkerVisibilityRef.current()
  }, [markersEnabled, visibleUnitIds])

  useEffect(() => {
    const viewerElement = viewerElementRef.current
    if (!viewerElement || !dziUrl) return

    const markerElements = markerElementsRef.current
    const markerLocations = markerLocationsRef.current
    const markerUnits = markerUnitsRef.current
    let tiledImage: OpenSeadragon.TiledImage | null = null
    let animationFrame: number | null = null
    setViewerError(null)
    const viewer = OpenSeadragon({
      element: viewerElement,
      tileSources: dziUrl,
      showNavigationControl: false,
      showNavigator: false,
      maxZoomLevel,
      defaultZoomLevel,
      minZoomImageRatio: 0.85,
      visibilityRatio: 0.75,
      constrainDuringPan: true,
      animationTime: 0.6,
      blendTime: 0.15,
      gestureSettingsMouse: {
        clickToZoom: false,
      },
    })

    function updateMarkerVisibility() {
      const showDetails = getConfiguredZoomLevel(viewer, configuredZoomMax)
        >= MARKER_DETAIL_ZOOM_LEVEL
      const viewportBounds = viewer.viewport.getBounds(true)
      const candidates = Array.from(markerUnits.values())
        .filter((unit) => {
          const location = markerLocations.get(unit.id)
          const isFocused = focusedUnitIdRef.current === unit.id
          return markersEnabledRef.current
            && (isFocused || visibleUnitIdsRef.current.has(unit.id))
            && Boolean(location && viewportBounds.containsPoint(location))
        })
        .sort((firstUnit, secondUnit) => {
          const firstIsFocused = focusedUnitIdRef.current === firstUnit.id
          const secondIsFocused = focusedUnitIdRef.current === secondUnit.id
          if (firstIsFocused !== secondIsFocused) return firstIsFocused ? -1 : 1
          if (firstUnit.isHot !== secondUnit.isHot) {
            return firstUnit.isHot ? -1 : 1
          }
          return getNumericPrice(firstUnit) - getNumericPrice(secondUnit)
        })

      const displayedUnitIds = new Set<string>()
      const displayedPositions: OpenSeadragon.Point[] = []
      const collisionWidth = showDetails ? 164 : 98
      const collisionHeight = showDetails ? 88 : 36

      for (const unit of candidates) {
        if (displayedUnitIds.size >= markerLimit) break

        const location = markerLocations.get(unit.id)
        if (!location) continue
        const pixelPosition = viewer.viewport.pixelFromPoint(location, true)
        const overlaps = displayedPositions.some((position) => (
          Math.abs(position.x - pixelPosition.x) < collisionWidth
          && Math.abs(position.y - pixelPosition.y) < collisionHeight
        ))

        if (overlaps) continue
        displayedUnitIds.add(unit.id)
        displayedPositions.push(pixelPosition)
      }

      for (const [unitId, marker] of markerElements) {
        marker.classList.toggle(
          styles.markerExpanded,
          showDetails || focusedUnitIdRef.current === unitId,
        )
        marker.classList.toggle(
          styles.markerHidden,
          !displayedUnitIds.has(unitId),
        )
      }
    }

    function scheduleMarkerVisibilityUpdate() {
      if (animationFrame !== null) return

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null
        updateMarkerVisibility()
      })
    }

    updateMarkerVisibilityRef.current = scheduleMarkerVisibilityUpdate

    function addMarker(unit: ProjectMapUnit) {
      if (!tiledImage) return null

      const existingLocation = markerLocations.get(unit.id)
      if (existingLocation) {
        markerUnits.set(unit.id, unit)
        return existingLocation
      }

      const usesViewportCoordinates = unit.x >= 0
        && unit.x <= 1
        && unit.y >= 0
        && unit.y <= 1
      const location = usesViewportCoordinates
        ? new OpenSeadragon.Point(unit.x, unit.y)
        : tiledImage.imageToViewportCoordinates(unit.x, unit.y)
      const marker = createMarkerElement(unit, (selected) => {
        focusMapUnitRef.current(selected)
      })

      markerElements.set(unit.id, marker)
      markerLocations.set(unit.id, location)
      markerUnits.set(unit.id, unit)
      viewer.addOverlay({
        element: marker,
        location,
        placement: OpenSeadragon.Placement.BOTTOM,
      })
      return location
    }

    focusMapUnitRef.current = (unit) => {
      if (!markersEnabledRef.current) setMarkersEnabled(true)

      const location = addMarker(unit)
      if (!location) return

      focusedUnitIdRef.current = unit.id
      setSelectedUnit(unit)
      scheduleMarkerVisibilityUpdate()

      const focusZoom = Math.min(
        focusZoomLevel,
        viewer.viewport.getMaxZoom(),
      )
      viewer.viewport.panTo(location)
      viewer.viewport.zoomTo(focusZoom, location)
      viewer.viewport.applyConstraints()
    }

    viewer.addHandler('open', () => {
      tiledImage = viewer.world.getItemAt(0)
      if (!tiledImage) return

      markerElements.clear()
      markerLocations.clear()
      markerUnits.clear()
      for (const unit of units) addMarker(unit)
      scheduleMarkerVisibilityUpdate()
    })
    viewer.addHandler('animation', scheduleMarkerVisibilityUpdate)
    viewer.addHandler('animation-finish', scheduleMarkerVisibilityUpdate)
    viewer.addHandler('resize', scheduleMarkerVisibilityUpdate)
    viewer.addHandler('zoom', scheduleMarkerVisibilityUpdate)
    viewer.addHandler('open-failed', () => {
      setViewerError('Không thể mở bản đồ DZI. Vui lòng kiểm tra lại file bản đồ.')
    })

    return () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame)
      updateMarkerVisibilityRef.current = () => undefined
      focusMapUnitRef.current = () => undefined
      markerElements.clear()
      markerLocations.clear()
      markerUnits.clear()
      viewer.destroy()
    }
  }, [
    configuredZoomMax,
    defaultZoomLevel,
    dziUrl,
    focusZoomLevel,
    markerLimit,
    maxZoomLevel,
    setMarkersEnabled,
    setSelectedUnit,
    units,
  ])

  const focusMapUnit = useCallback((unit: ProjectMapUnit) => {
    focusMapUnitRef.current(unit)
  }, [])

  const clearFocusedUnit = useCallback(() => {
    focusedUnitIdRef.current = null
    updateMarkerVisibilityRef.current()
  }, [])

  return {
    viewerElementRef,
    viewerError,
    focusMapUnit,
    clearFocusedUnit,
  }
}
