import type { ElementType } from 'react'

export type ProjectTabKey =
  | 'overview'
  | 'location'
  | 'zones'
  | 'floorplan'
  | 'scale'
  | 'policy'
  | 'news'

export type ProjectData = {
  id: string
  apiId: number
  name: string
  tagline: string
  heroImage: string
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

export type GetPhasesParams = {
  pageNumber: number
  pageSize: number
  projectId?: number
}

export type ProjectHeroProps = {
  image: string
  alt: string
}

export type ProjectZonesProps = {
  projectId: number
}

export type SectionTabsProps = {
  active: ProjectTabKey
}

export type TabItem = {
  key: ProjectTabKey
  label: string
  icon: ElementType
  href: string
}

export type ZoneCardProps = {
  phase: Phase
}
