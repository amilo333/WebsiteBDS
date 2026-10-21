import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPhases } from '../api/phase-api'

const PAGE_SIZE = 4

export function useProjectPhases(projectId: number) {
  const [page, setPage] = useState(1)
  const query = useQuery({
    queryKey: ['phases', projectId, page, PAGE_SIZE],
    queryFn: () =>
      getPhases({
        pageNumber: page - 1,
        pageSize: PAGE_SIZE,
      }),
    placeholderData: (previousData) => previousData,
  })

  return {
    phases: query.data?.data ?? [],
    totalPages: query.data?.totalPages ?? 0,
    page,
    setPage,
    isPending: query.isPending,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
  }
}
