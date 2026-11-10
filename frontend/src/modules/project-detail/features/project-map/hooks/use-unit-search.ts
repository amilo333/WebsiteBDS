import { useQuery } from '@tanstack/react-query'
import { searchProjectMapCodes } from '../api'

export function useUnitSearch(projectId: number, keyword: string) {
  const normalizedKeyword = keyword.trim()

  return useQuery({
    queryKey: ['project-map-codes', projectId, normalizedKeyword],
    queryFn: () => searchProjectMapCodes(projectId, normalizedKeyword),
    enabled: normalizedKeyword.length > 0,
  })
}
