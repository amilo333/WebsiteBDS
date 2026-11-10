import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { CircularProgress, Typography } from '@mui/material'
import { formatProjectMapArea } from '../../utils'
import type { CodeSuggestion } from '../../types'
import styles from '../../style.module.scss'

type MapSearchProps = {
  keyword: string
  searchError: string | null
  isSearchFocused: boolean
  isFetching: boolean
  suggestions: CodeSuggestion[]
  onKeywordChange: (keyword: string) => void
  onFocus: () => void
  onBlur: () => void
  onSelect: (suggestion: CodeSuggestion) => void
}

export function MapSearch({
  keyword,
  searchError,
  isSearchFocused,
  isFetching,
  suggestions,
  onKeywordChange,
  onFocus,
  onBlur,
  onSelect,
}: MapSearchProps) {
  return (
    <div className={styles.mapHeader}>
      <Typography component="h2">Mặt bằng quỹ căn</Typography>

      <div className={styles.unitSearch}>
        <SearchRoundedIcon aria-hidden="true" />
        <input
          type="search"
          value={keyword}
          placeholder="Tìm vị trí căn theo mã căn"
          aria-label="Tìm kiếm theo mã căn"
          autoComplete="off"
          onChange={(event) => onKeywordChange(event.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {isFetching && (
          <CircularProgress size={14} className={styles.searchLoading} />
        )}

        {isSearchFocused && keyword.trim() && (
          <div className={styles.searchSuggestions} role="listbox">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.code}
                type="button"
                role="option"
                aria-selected="false"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => onSelect(suggestion)}
              >
                <span>
                  <strong>{suggestion.code}</strong>
                  {suggestion.unit && (
                    <small>
                      {formatProjectMapArea(suggestion.unit.area)} ·{' '}
                      {suggestion.unit.productType ?? 'Chưa cập nhật'}
                    </small>
                  )}
                </span>
                {suggestion.unit && (
                  <em className={suggestion.unit.statusCode === 'AVAILABLE'
                    ? styles.suggestionAvailable
                    : suggestion.unit.statusCode
                      ? styles.suggestionSold
                      : styles.suggestionHidden}
                  >
                    {suggestion.unit.status}
                  </em>
                )}
              </button>
            ))}

            {!isFetching && suggestions.length === 0 && (
              <p>Không tìm thấy mã căn phù hợp.</p>
            )}
          </div>
        )}
        {searchError && <small className={styles.searchError}>{searchError}</small>}
      </div>
    </div>
  )
}
