import { Pagination as MuiPagination } from '@mui/material'
import type { PaginationProps } from './type'

export function Pagination(props: PaginationProps) {
  return <MuiPagination {...props} />
}

export type { PaginationProps } from './type'
