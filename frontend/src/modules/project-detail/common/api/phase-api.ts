import { httpClient } from '../../../../api/http-client'
import type {
  GetPhasesParams,
  PhaseSearchResponse,
} from '../types/project'

export async function getPhases(params: GetPhasesParams) {
  const response = await httpClient.get<PhaseSearchResponse>(
    '/portal/phases/search',
    { params },
  )

  return response.data
}
