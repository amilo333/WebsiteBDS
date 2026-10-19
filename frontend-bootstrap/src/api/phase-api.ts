import type { PhaseSearchResponse } from '../types/project'
import { httpClient } from './http-client'

type GetPhasesParams = {
  pageNumber: number
  pageSize: number
  projectId?: number
}

export async function getPhases(params: GetPhasesParams) {
  const response = await httpClient.get<PhaseSearchResponse>('/portal/phases/search', {
    params,
  })

  return response.data
}
