import { useQuery } from '@tanstack/react-query'
import { getProjectMap, searchProjectMapUnits } from '../api'

export function useProjectMap(projectId: number, enabled = true) {
  const mapQuery = useQuery({
    queryKey: ['project-map', projectId],
    queryFn: () => getProjectMap(projectId),
    enabled,
  })
  const unitsQuery = useQuery({
    queryKey: ['project-map-units', projectId],
    queryFn: () => searchProjectMapUnits(projectId),
    enabled,
  })

  return {
    mapConfig: mapQuery.data,
    unitsData: unitsQuery.data,
    isPending: mapQuery.isPending || unitsQuery.isPending,
    isError: mapQuery.isError || unitsQuery.isError,
    error: mapQuery.error ?? unitsQuery.error,
  }
}
