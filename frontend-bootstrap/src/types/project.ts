export type ProjectTabKey =
  | 'overview'
  | 'location'
  | 'zones'
  | 'floorplan'
  | 'scale'
  | 'policy'
  | 'news'

export type ProjectZone = {
  id: string
  name: string
  image: string
  units: string
  area: string
}

export type ProjectData = {
  id: string
  apiId: number
  heroImage: string
  zones: ProjectZone[]
}

export type PhaseFileInfo = {
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

export type Phase = {
  id: number
  projectId: number
  name: string
  shortDescription: string | null
  fileInfo: PhaseFileInfo | null
  sortOrder: number
}

export type PhaseSearchResponse = {
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

export type PortalProject = {
  id: number
  code: string
  name: string
  shortDescription: string | null
  fileInfo: PhaseFileInfo | null
}

export type ProjectSearchResponse = {
  code: string
  message: string
  debug: unknown | null
  requestId: string
  serverTime: string
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPages: number
  data: PortalProject[]
}
