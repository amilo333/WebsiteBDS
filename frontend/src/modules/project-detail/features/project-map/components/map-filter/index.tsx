import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded'
import { UNIT_TYPE_FILTERS } from '../../constants'
import type { UnitTypeFilter } from '../../types'
import styles from '../../style.module.scss'

type MapFilterProps = {
  hotEnabled: boolean
  typeFilters: UnitTypeFilter[]
  onToggleHot: () => void
  onToggleType: (filter: UnitTypeFilter) => void
}

export function MapFilter({
  hotEnabled,
  typeFilters,
  onToggleHot,
  onToggleType,
}: MapFilterProps) {
  return (
    <div className={styles.filterBar} aria-label="Bộ lọc quỹ căn">
      <button
        type="button"
        className={`${styles.filterChip} ${styles.hotFilter} ${hotEnabled ? styles.filterChipActive : ''}`}
        aria-pressed={hotEnabled}
        onClick={onToggleHot}
      >
        <span className={styles.filterCheck}>
          {hotEnabled && <CheckRoundedIcon />}
        </span>
        Căn HOT
        <LocalFireDepartmentRoundedIcon className={styles.filterIcon} />
      </button>

      {UNIT_TYPE_FILTERS.map((filter) => {
        const isActive = typeFilters.includes(filter.value)
        return (
          <button
            key={filter.value}
            type="button"
            className={`${styles.filterChip} ${isActive ? styles.filterChipActive : ''}`}
            aria-pressed={isActive}
            onClick={() => onToggleType(filter.value)}
          >
            <span className={styles.filterCheck}>
              {isActive && <CheckRoundedIcon />}
            </span>
            {filter.label}
            <span className={styles.typeIcon} aria-hidden="true">⌂</span>
          </button>
        )
      })}
    </div>
  )
}
