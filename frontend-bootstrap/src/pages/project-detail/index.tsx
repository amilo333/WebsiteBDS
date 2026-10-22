import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getPhases } from '../../api'
import { PageBreadcrumbs, PageIntro } from '../../components/core'
import { SiteLayout } from '../../components/layouts'
import { SectionTabs, ZoneCard } from '../../components/composites'
import { project } from '../../data/project'
import { useProject, useScrollToHash } from '../../hooks'
import styles from './style.module.scss'

const PAGE_SIZE = 4

type PaginationItem = number | 'start-ellipsis' | 'end-ellipsis'

function getPaginationItems(currentPage: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'end-ellipsis', totalPages]
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      'start-ellipsis',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ]
  }

  return [
    1,
    'start-ellipsis',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'end-ellipsis',
    totalPages,
  ]
}

export function ProjectDetailPage() {
  useScrollToHash('#phan-khu')

  const [page, setPage] = useState(1)
  const {
    data: projectDetails,
    isPending: isProjectPending,
    isError: isProjectError,
  } = useProject(project.apiId)
  const {
    data: response,
    isPending,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['phases', 100, page, PAGE_SIZE],
    queryFn: () =>
      getPhases({
        pageNumber: page - 1,
        pageSize: PAGE_SIZE,
      }),
    placeholderData: (previousData) => previousData,
  })

  const phases = response?.data ?? []
  const totalPages = response?.totalPages ?? 0
  const paginationItems = getPaginationItems(page, totalPages)
  const projectName = projectDetails?.name
    ?? (isProjectPending ? 'Đang tải thông tin dự án...' : 'Dự án')
  const projectDescription = projectDetails?.shortDescription
    ?? (isProjectError
      ? 'Không thể tải thông tin dự án.'
      : `Theo dõi thông tin chi tiết, bảng giá, mặt bằng, tiến độ và chính sách bán hàng dự án ${projectName}.`)

  return (
    <SiteLayout>
      <div className="container">
        <PageBreadcrumbs items={[{ label: 'Dự án' }, { label: projectName }]} />
        <PageIntro title={projectName} subtitle={projectDescription} />

        <section id="tong-quan" className={styles.hero} aria-label="Tổng quan dự án">
          <img src={project.heroImage} alt={`Toàn cảnh ${projectName}`} />
          <div className={styles.dots} aria-hidden="true">
            <span className={styles.dotActive} />
            <span />
            <span />
          </div>
        </section>

        <SectionTabs active="zones" />

        <section
          id="phan-khu"
          className={`${styles.zones} row g-4 ${isFetching && !isPending ? styles.refreshing : ''}`}
          aria-label="Các phân khu dự án"
          aria-busy={isFetching}
        >
          {isPending && (
            <div className="col-12 py-5 text-center" role="status" aria-live="polite">
              <div className="spinner-border text-primary" aria-hidden="true" />
              <span className="visually-hidden">Đang tải danh sách phân khu...</span>
            </div>
          )}

          {isError && (
            <div className="col-12">
              <div className="alert alert-danger" role="alert">
                {error instanceof Error ? error.message : 'Không thể tải danh sách phân khu'}
              </div>
            </div>
          )}

          {!isPending && !isError && phases.length === 0 && (
            <div className="col-12 py-4">Chưa có phân khu nào.</div>
          )}

          {phases.map((phase) => (
            <div key={phase.id} className="col-12 col-sm-6 col-lg-3">
              <ZoneCard phase={phase} />
            </div>
          ))}
        </section>

        {!isPending && !isError && totalPages > 1 && (
          <nav className={styles.paginationNav} aria-label="Phân trang phân khu">
            <ul className={styles.pagination}>
              <li
                className={`${styles.paginationItem} ${page === 1 || isFetching ? styles.disabled : ''}`}
              >
                <button
                  type="button"
                  className={styles.pageButton}
                  aria-label="Trang trước"
                  disabled={page === 1 || isFetching}
                  onClick={() => setPage((currentPage) => currentPage - 1)}
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>

              {paginationItems.map((item) =>
                typeof item === 'number' ? (
                  <li
                    key={item}
                    className={`${styles.paginationItem} ${page === item ? styles.active : ''} ${isFetching ? styles.disabled : ''}`}
                    aria-current={page === item ? 'page' : undefined}
                  >
                    <button
                      type="button"
                      className={styles.pageButton}
                      disabled={isFetching}
                      aria-label={`Trang ${item}`}
                      onClick={() => setPage(item)}
                    >
                      {item}
                    </button>
                  </li>
                ) : (
                  <li key={item} className={styles.paginationItem} aria-hidden="true">
                    <span className={`${styles.pageButton} ${styles.ellipsis}`}>&hellip;</span>
                  </li>
                ),
              )}

              <li
                className={`${styles.paginationItem} ${page === totalPages || isFetching ? styles.disabled : ''}`}
              >
                <button
                  type="button"
                  className={styles.pageButton}
                  aria-label="Trang sau"
                  disabled={page === totalPages || isFetching}
                  onClick={() => setPage((currentPage) => currentPage + 1)}
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </SiteLayout>
  )
}
