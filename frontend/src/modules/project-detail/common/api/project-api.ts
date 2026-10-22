import { httpClient } from '../../../../api/http-client'
import type { ProjectSearchResponse } from '../types/project'

const PROJECT_PAGE_SIZE = 100

export async function getProjectById(projectId: number) {
  let pageNumber = 0

  while (true) {
    const response = await httpClient.get<ProjectSearchResponse>(
      '/portal/projects/search',
      {
        params: {
          pageNumber,
          pageSize: PROJECT_PAGE_SIZE,
        },
      },
    )
    const project = response.data.data.find((item) => item.id === projectId)

    if (project) return project

    pageNumber += 1

    if (pageNumber >= response.data.totalPages) return null
  }
}
