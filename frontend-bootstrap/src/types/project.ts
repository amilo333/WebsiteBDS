export type ProjectTabKey =
  | 'overview'
  | 'location'
  | 'zones'
  | 'floorplan'
  | 'scale'
  | 'policy'
  | 'news'

export interface ProjectZone {
  id: string
  name: string
  image: string
  units: string
  area: string
}

export interface ProjectData {
  id: string
  name: string
  tagline: string
  heroImage: string
  zones: ProjectZone[]
}

export interface PhaseFileInfo {
  id: number
  code: string
  fileName: string
  originalName: string
  filePath: string
  fileSize: number
  contentType: string
  isPublic: boolean
  fileExtension: string
  isTemp: boolean
  refId: number
  refType: string
  refCode: string
  fullLink: string
}

export interface Phase {
  id: number
  projectId: number
  name: string
  shortDescription: string | null
  fileInfo: PhaseFileInfo | null
  sortOrder: number
}

export interface PhaseSearchResponse {
  code: string
  message: string
  debug: unknown | null
  requestId: string
  serverTime: string
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPages: number
  data: Phase[]
}
