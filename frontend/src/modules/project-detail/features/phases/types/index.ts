import type { PhaseFileInfo } from '../../../common/types/project'

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

export type ProjectZonesProps = {
  projectId: number
}

export type ZoneCardProps = {
  phase: Phase
}
