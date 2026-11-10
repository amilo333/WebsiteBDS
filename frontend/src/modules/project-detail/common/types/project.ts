import type { ElementType } from 'react'

export type ProjectTabKey =
  | 'overview'
  | 'location'
  | 'zones'
  | 'floorplan'
  | 'scale'
  | 'policy'
  | 'news'

export type BreadcrumbItem = {
  label: string
  href?: string
}

export type PageBreadcrumbsProps = {
  items: BreadcrumbItem[]
}

export type PageIntroProps = {
  title: string
  subtitle: string
}

export type ProjectData = {
  id: string
  apiId: number
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

export type ProjectHeroProps = {
  image: string
  alt: string
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
