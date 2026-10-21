import { Alert, CircularProgress, Pagination, Typography } from '@mui/material'
import { useProjectPhases } from '../../common'
import type { ProjectZonesProps } from '../../common/types/project'
import { ZoneCard } from '../zone-card'
import styles from './style.module.scss'

export function ProjectZones({ projectId }: ProjectZonesProps) {
  const {
    phases,
    totalPages,
    page,
    setPage,
    isPending,
    isFetching,
    isError,
    error,
  } = useProjectPhases(projectId)

  return (
    <section id="phan-khu" aria-label="Danh sách phân khu">
      <div
        className={`${styles.grid} ${isFetching && !isPending ? styles.fetching : ''}`}
        aria-busy={isFetching}
      >
        {isPending && (
          <div className={styles.fullRow}>
            <CircularProgress />
          </div>
        )}

        {isError && (
          <Alert severity="error" className={styles.fullRow}>
            {error instanceof Error
              ? error.message
              : 'Không thể tải danh sách phân khu'}
          </Alert>
        )}

        {!isPending && !isError && phases.length === 0 && (
          <Typography className={`${styles.fullRow} ${styles.empty}`}>
            Chưa có phân khu nào.
          </Typography>
        )}

        {phases.map((phase) => (
          <ZoneCard key={phase.id} phase={phase} />
        ))}
      </div>

      {!isPending && !isError && totalPages > 1 && (
        <nav aria-label="Phân trang phân khu" className={styles.paginationNav}>
          <Pagination
            className={styles.pagination}
            page={page}
            count={totalPages}
            onChange={(_, nextPage) => setPage(nextPage)}
            disabled={isFetching}
            shape="rounded"
            showFirstButton
            showLastButton
            siblingCount={0}
          />
        </nav>
      )}
    </section>
  )
}
