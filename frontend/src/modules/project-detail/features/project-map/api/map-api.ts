import { httpClient } from '../../../../../api/http-client'
import type {
  ProjectMapConfig,
  ProjectMapResponse,
  ProjectMapUnitApi,
  SearchProjectMapUnitsParams,
} from '../types'

const PROJECT_MAP_PARAMS = {
  mapType: 'PROJECT',
} as const

export async function getProjectMap(projectId: number) {
  const response = await httpClient.get<ProjectMapResponse<ProjectMapConfig>>(
    '/portal/map/get',
    {
      params: {
        ...PROJECT_MAP_PARAMS,
        refId: projectId,
      },
    },
  )

  return response.data.data
}

export async function searchProjectMapUnits(
  projectId: number,
  params: SearchProjectMapUnitsParams = {},
) {
  const response = await httpClient.post<
    ProjectMapResponse<ProjectMapUnitApi[]>
  >('/portal/map/search', {
    ...PROJECT_MAP_PARAMS,
    refId: projectId,
    ...params,
  })

  return response.data.data
}

export async function searchProjectMapCodes(
  projectId: number,
  keyword: string,
) {
  const response = await httpClient.get<ProjectMapResponse<string[]>>(
    '/portal/map/get-codes',
    {
      params: {
        ...PROJECT_MAP_PARAMS,
        refId: projectId,
        keyword,
      },
    },
  )

  return response.data.data
}
