export type ProjectMapAccessProps = {
  projectId: number
}

export type ProjectMapConfig = {
  id: number
  fileExtension: string
  contentType: string
  dziKey: string
  dpi: number
  totalTiles: number
  canSearch: boolean
  buildingMarkers: unknown[]
  mobileZoomDefault: number
  tabletZoomDefault: number
  desktopZoomDefault: number
  mobileZoomMax: number
  tabletZoomMax: number
  desktopZoomMax: number
  mobileMaxUnitCode: number
  tabletMaxUnitCode: number
  desktopMaxUnitCode: number
  mobileMaxLabelUnitType: number
  tabletMaxLabelUnitType: number
  desktopMaxLabelUnitType: number
  mobileMaxLabelUnitPrice: number
  tabletMaxLabelUnitPrice: number
  desktopMaxLabelUnitPrice: number
  unitSize: number
  debounceDelayMs: number
  countUnitViewport: number
  mobileFocusZoom: number
  tabletFocusZoom: number
  desktopFocusZoom: number
}

export type ProjectMapUnit = {
  id: string
  code: string
  area: number | string | null
  productTypeCode: string | null
  productType: string | null
  price: number | string | null
  loanPrice: number | string | null
  isHot: boolean
  statusCode: string | null
  status: string | null
  inquiryStatusCode: string | null
  inquiryStatusName: string | null
  x: number
  y: number
}

export type ProjectMapUnitApi = {
  unitId: number
  code: string
  isHot: boolean | null
  statusCode: string | null
  areaLand: number | null
  basePrice: number | null
  loanPrice: number | null
  unitTypeCode: string | null
  unitTypeName: string | null
  source: string | null
  inquiryStatusCode: string | null
  inquiryStatusName: string | null
  imgX: number
  imgY: number
  xPixel?: number
  yPixel?: number
  x?: number
  y?: number
  rotation?: number
  pageWidth?: number
  pageHeight?: number
  dpi?: number
}

export type SearchProjectMapUnitsParams = {
  unitTypeCodes?: string[]
  keyword?: string
  imageX?: number
  imageY?: number
}

export type ProjectMapResponse<TData> = {
  code: string
  message: string
  debug?: unknown | null
  requestId?: string
  serverTime?: string
  data: TData
}

export type CreateUnitInquiryRequest = {
  projectId: number
  unitCode: string
}

export type ProjectMapViewerProps = {
  projectId: number
}

export type UnitTypeFilter =
  | 'DETACHED'
  | 'SEMI_DETACHED'
  | 'QUAD'
  | 'TOWNHOUSE'
  | 'SHOPHOUSE'

export type UnitTypeFilterOption = {
  value: UnitTypeFilter
  label: string
  aliases: string[]
}

export type CodeSuggestion = {
  code: string
  unit: ProjectMapUnit | null
}
