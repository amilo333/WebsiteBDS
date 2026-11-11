import OpenSeadragon from "openseadragon";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { MARKER_DETAIL_ZOOM_LEVEL } from "../constants";
import { createMarkerElement } from "../components/map-marker";
import type { ProjectMapUnit } from "../types";
import { getConfiguredZoomLevel, getNumericPrice } from "../utils";
import styles from "../style.module.scss";

type UseMapViewerOptions = {
  dziUrl: string | null;
  maxZoomLevel?: number;
  defaultZoomLevel: number;
  focusZoomLevel: number;
  configuredZoomMax: number;
  markerLimit: number;
  units: ProjectMapUnit[];
  visibleUnitIds: Set<string>;
  markersEnabled: boolean;
  setMarkersEnabled: Dispatch<SetStateAction<boolean>>;
  onOpenUnitDetail: (unit: ProjectMapUnit) => void;
  onRequestInformation: (unit: ProjectMapUnit) => Promise<void>;
  onSearchNearestUnit: (
    imageX: number,
    imageY: number,
  ) => Promise<ProjectMapUnit | null>;
};

type MarkerPagination = {
  page: number;
  totalPages: number;
  totalItems: number;
  displayedItems: number;
};

type PixelRect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

const MARKER_GAP = 8;

function getMarkerOffsets(width: number, height: number) {
  const horizontalStep = width + MARKER_GAP;
  const verticalStep = height + MARKER_GAP;

  return [
    [0, 0],
    [0, -verticalStep],
    [horizontalStep, -verticalStep],
    [horizontalStep, 0],
    [horizontalStep, verticalStep],
    [0, verticalStep],
    [-horizontalStep, verticalStep],
    [-horizontalStep, 0],
    [-horizontalStep, -verticalStep],
  ] as const;
}

function getMarkerRect(
  position: OpenSeadragon.Point,
  width: number,
  height: number,
): PixelRect {
  return {
    left: position.x - width / 2,
    right: position.x + width / 2,
    top: position.y - height,
    bottom: position.y,
  };
}

function rectanglesOverlap(first: PixelRect, second: PixelRect) {
  return (
    first.left < second.right + MARKER_GAP &&
    first.right + MARKER_GAP > second.left &&
    first.top < second.bottom + MARKER_GAP &&
    first.bottom + MARKER_GAP > second.top
  );
}

function isRectInsideViewer(rect: PixelRect, width: number, height: number) {
  return (
    rect.left >= MARKER_GAP &&
    rect.top >= MARKER_GAP &&
    rect.right <= width - MARKER_GAP &&
    rect.bottom <= height - MARKER_GAP
  );
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
  onOpenUnitDetail,
  onRequestInformation,
  onSearchNearestUnit,
}: UseMapViewerOptions) {
  const viewerElementRef = useRef<HTMLDivElement>(null);
  const markerElementsRef = useRef(new Map<string, HTMLDivElement>());
  const markerLocationsRef = useRef(new Map<string, OpenSeadragon.Point>());
  const markerUnitsRef = useRef(new Map<string, ProjectMapUnit>());
  const visibleUnitIdsRef = useRef(new Set<string>());
  const markersEnabledRef = useRef(true);
  const focusedUnitIdRef = useRef<string | null>(null);
  const markerPageRef = useRef(1);
  const markerTotalPagesRef = useRef(0);
  const updateMarkerVisibilityRef = useRef<(resetPage?: boolean) => void>(
    () => undefined,
  );
  const focusMapUnitRef = useRef<(unit: ProjectMapUnit) => void>(
    () => undefined,
  );
  const requestInformationRef = useRef(onRequestInformation);
  const openUnitDetailRef = useRef(onOpenUnitDetail);
  const searchNearestUnitRef = useRef(onSearchNearestUnit);
  const [viewerError, setViewerError] = useState<string | null>(null);
  const [markerPagination, setMarkerPagination] = useState<MarkerPagination>({
    page: 1,
    totalPages: 0,
    totalItems: 0,
    displayedItems: 0,
  });

  useEffect(() => {
    markersEnabledRef.current = markersEnabled;
    visibleUnitIdsRef.current = visibleUnitIds;
    markerPageRef.current = 1;
    updateMarkerVisibilityRef.current(true);
  }, [markersEnabled, visibleUnitIds]);

  useEffect(() => {
    requestInformationRef.current = onRequestInformation;
  }, [onRequestInformation]);

  useEffect(() => {
    openUnitDetailRef.current = onOpenUnitDetail;
  }, [onOpenUnitDetail]);

  useEffect(() => {
    searchNearestUnitRef.current = onSearchNearestUnit;
  }, [onSearchNearestUnit]);

  useEffect(() => {
    const viewerElement = viewerElementRef.current;
    if (!viewerElement || !dziUrl) return;
    const mapElement = viewerElement;

    const markerElements = markerElementsRef.current;
    const markerLocations = markerLocationsRef.current;
    const markerUnits = markerUnitsRef.current;
    let tiledImage: OpenSeadragon.TiledImage | null = null;
    let animationFrame: number | null = null;
    setViewerError(null);
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
        dragToPan: false,
      },
    });
    let isSpacePressed = false;

    function isEditableTarget(target: EventTarget | null) {
      return target instanceof HTMLElement && (
        target.isContentEditable
        || target.tagName === 'INPUT'
        || target.tagName === 'TEXTAREA'
        || target.tagName === 'SELECT'
      );
    }

    function setSpacePanEnabled(enabled: boolean) {
      isSpacePressed = enabled;
      viewer.gestureSettingsByDeviceType('mouse').dragToPan = enabled;
      mapElement.classList.toggle(styles.viewerPanEnabled, enabled);
    }

    function handleSpaceKeyDown(event: KeyboardEvent) {
      if (event.code !== 'Space'
        || event.repeat
        || isEditableTarget(event.target)
        || !mapElement.matches(':hover')) return;

      event.preventDefault();
      setSpacePanEnabled(true);
    }

    function handleSpaceKeyUp(event: KeyboardEvent) {
      if (event.code !== 'Space' || !isSpacePressed) return;
      event.preventDefault();
      setSpacePanEnabled(false);
    }

    function handleWindowBlur() {
      setSpacePanEnabled(false);
    }

    window.addEventListener('keydown', handleSpaceKeyDown);
    window.addEventListener('keyup', handleSpaceKeyUp);
    window.addEventListener('blur', handleWindowBlur);

    function updateMarkerVisibility(resetPage = false) {
      const showDetails =
        getConfiguredZoomLevel(viewer, configuredZoomMax) >=
        MARKER_DETAIL_ZOOM_LEVEL;
      const viewportBounds = viewer.viewport.getBounds(true);
      const candidates = Array.from(markerUnits.values())
        .filter((unit) => {
          const location = markerLocations.get(unit.id);
          const isFocused = focusedUnitIdRef.current === unit.id;
          return (
            markersEnabledRef.current &&
            (isFocused || visibleUnitIdsRef.current.has(unit.id)) &&
            Boolean(location && viewportBounds.containsPoint(location))
          );
        })
        .sort((firstUnit, secondUnit) => {
          const firstIsFocused = focusedUnitIdRef.current === firstUnit.id;
          const secondIsFocused = focusedUnitIdRef.current === secondUnit.id;
          if (firstIsFocused !== secondIsFocused)
            return firstIsFocused ? -1 : 1;
          if (firstUnit.isHot !== secondUnit.isHot) {
            return firstUnit.isHot ? -1 : 1;
          }
          return getNumericPrice(firstUnit) - getNumericPrice(secondUnit);
        });

      const pageSize = Math.max(1, Math.floor(markerLimit));
      const totalPages = Math.ceil(candidates.length / pageSize);
      if (resetPage) markerPageRef.current = 1;
      const currentPage =
        totalPages === 0 ? 1 : Math.min(markerPageRef.current, totalPages);
      markerPageRef.current = currentPage;
      markerTotalPagesRef.current = totalPages;
      const pageCandidates = candidates.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
      );
      const displayedUnitIds = new Set<string>();
      const displayedRects: PixelRect[] = [];
      const collisionWidth = showDetails ? 164 : 98;
      const collisionHeight = showDetails ? 124 : 36;
      const markerOffsets = getMarkerOffsets(collisionWidth, collisionHeight);
      const viewerWidth = mapElement.clientWidth;
      const viewerHeight = mapElement.clientHeight;

      for (const unit of pageCandidates) {
        const location = markerLocations.get(unit.id);
        const marker = markerElements.get(unit.id);
        if (!location || !marker) continue;
        const pixelPosition = viewer.viewport.pixelFromPoint(location, true);
        const availablePosition = markerOffsets
          .map(
            ([offsetX, offsetY]) =>
              new OpenSeadragon.Point(
                pixelPosition.x + offsetX,
                pixelPosition.y + offsetY,
              ),
          )
          .find((position) => {
            const rect = getMarkerRect(
              position,
              collisionWidth,
              collisionHeight,
            );
            return (
              isRectInsideViewer(rect, viewerWidth, viewerHeight) &&
              displayedRects.every(
                (displayedRect) => !rectanglesOverlap(rect, displayedRect),
              )
            );
          });

        if (!availablePosition) continue;
        const displayRect = getMarkerRect(
          availablePosition,
          collisionWidth,
          collisionHeight,
        );
        const displayLocation = viewer.viewport.pointFromPixel(
          availablePosition,
          true,
        );
        viewer.updateOverlay(
          marker,
          displayLocation,
          OpenSeadragon.Placement.BOTTOM,
        );
        displayedUnitIds.add(unit.id);
        displayedRects.push(displayRect);
      }

      for (const [unitId, marker] of markerElements) {
        marker.classList.toggle(
          styles.markerExpanded,
          showDetails || focusedUnitIdRef.current === unitId,
        );
        marker.classList.toggle(
          styles.markerHidden,
          !displayedUnitIds.has(unitId),
        );
      }

      setMarkerPagination((current) => {
        const next = {
          page: currentPage,
          totalPages,
          totalItems: candidates.length,
          displayedItems: displayedUnitIds.size,
        };
        return current.page === next.page &&
          current.totalPages === next.totalPages &&
          current.totalItems === next.totalItems &&
          current.displayedItems === next.displayedItems
          ? current
          : next;
      });
    }

    let shouldResetPage = false;

    function scheduleMarkerVisibilityUpdate(resetPage = false) {
      shouldResetPage = shouldResetPage || resetPage;
      if (animationFrame !== null) return;

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        const resetPageOnUpdate = shouldResetPage;
        shouldResetPage = false;
        updateMarkerVisibility(resetPageOnUpdate);
      });
    }

    updateMarkerVisibilityRef.current = scheduleMarkerVisibilityUpdate;

    function addMarker(unit: ProjectMapUnit) {
      if (!tiledImage) return null;

      const existingLocation = markerLocations.get(unit.id);
      if (existingLocation) {
        markerUnits.set(unit.id, unit);
        return existingLocation;
      }

      const usesViewportCoordinates =
        unit.x >= 0 && unit.x <= 1 && unit.y >= 0 && unit.y <= 1;
      const location = usesViewportCoordinates
        ? new OpenSeadragon.Point(unit.x, unit.y)
        : tiledImage.imageToViewportCoordinates(unit.x, unit.y);
      const marker = createMarkerElement(
        unit,
        (selected) => openUnitDetailRef.current(selected),
        (selected) => requestInformationRef.current(selected),
      );

      markerElements.set(unit.id, marker);
      markerLocations.set(unit.id, location);
      markerUnits.set(unit.id, unit);
      viewer.addOverlay({
        element: marker,
        location,
        placement: OpenSeadragon.Placement.BOTTOM,
      });
      return location;
    }

    focusMapUnitRef.current = (unit) => {
      if (!markersEnabledRef.current) setMarkersEnabled(true);

      const location = addMarker(unit);
      if (!location) return;

      focusedUnitIdRef.current = unit.id;
      markerPageRef.current = 1;
      scheduleMarkerVisibilityUpdate(true);

      const focusZoom = Math.min(focusZoomLevel, viewer.viewport.getMaxZoom());
      viewer.viewport.panTo(location);
      viewer.viewport.zoomTo(focusZoom, location);
      viewer.viewport.applyConstraints();
    };

    viewer.addHandler("open", () => {
      tiledImage = viewer.world.getItemAt(0);
      if (!tiledImage) return;

      markerElements.clear();
      markerLocations.clear();
      markerUnits.clear();
      for (const unit of units) addMarker(unit);
      scheduleMarkerVisibilityUpdate(true);
    });
    viewer.addHandler("animation", () => scheduleMarkerVisibilityUpdate(false));
    viewer.addHandler("animation-finish", () =>
      scheduleMarkerVisibilityUpdate(true),
    );
    viewer.addHandler("resize", () => scheduleMarkerVisibilityUpdate(true));
    viewer.addHandler("zoom", () => scheduleMarkerVisibilityUpdate(true));
    viewer.addHandler("canvas-click", (event) => {
      if (isSpacePressed || !event.quick || !tiledImage) return;

      const viewportPoint = viewer.viewport.pointFromPixel(event.position, true);
      const imagePoint = tiledImage.viewportToImageCoordinates(viewportPoint);
      void searchNearestUnitRef.current(imagePoint.x, imagePoint.y)
        .then((unit) => {
          if (unit) focusMapUnitRef.current(unit);
        });
    });
    viewer.addHandler("open-failed", () => {
      setViewerError(
        "Không thể mở bản đồ DZI. Vui lòng kiểm tra lại file bản đồ.",
      );
    });

    return () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('keydown', handleSpaceKeyDown);
      window.removeEventListener('keyup', handleSpaceKeyUp);
      window.removeEventListener('blur', handleWindowBlur);
      setSpacePanEnabled(false);
      updateMarkerVisibilityRef.current = () => undefined;
      focusMapUnitRef.current = () => undefined;
      markerElements.clear();
      markerLocations.clear();
      markerUnits.clear();
      viewer.destroy();
    };
  }, [
    configuredZoomMax,
    defaultZoomLevel,
    dziUrl,
    focusZoomLevel,
    markerLimit,
    maxZoomLevel,
    setMarkersEnabled,
    units,
  ]);

  const focusMapUnit = useCallback((unit: ProjectMapUnit) => {
    focusMapUnitRef.current(unit);
  }, []);

  const setMarkerPage = useCallback((page: number) => {
    const totalPages = markerTotalPagesRef.current;
    markerPageRef.current = Math.max(1, Math.min(page, totalPages || 1));
    updateMarkerVisibilityRef.current(false);
  }, []);

  return {
    viewerElementRef, //gắn OpenSeadragon vào thẻ <div> bản đồ.
    viewerError, //chứa lỗi khi không mở được file DZI, dùng để hiện thông báo.
    focusMapUnit, //khi chọn kết quả tìm kiếm hoặc marker, bản đồ kéo đến tọa độ căn và zoom lên.
    markerPagination, //thông tin phân trang marker:
    setMarkerPage, //chuyển trang marker. Sau khi chuyển trang, hook ẩn marker trang cũ và sắp xếp lại marker trang mới theo 8 hướng.
  };
}
