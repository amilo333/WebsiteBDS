import styles from './BrandLogo.module.css'

interface BrandLogoProps {
  inverse?: boolean
  compact?: boolean
}

export function BrandLogo({ inverse = false, compact = true }: BrandLogoProps) {
  return (
    <span className={`${styles.logo} ${inverse ? styles.inverse : ''}`}>
      <svg viewBox="0 0 42 38" role="img" aria-label="BDS Việt Nam" className={styles.mark}>
        <path d="M2 15.5 12 8v23H2z" fill="currentColor" opacity=".9" />
        <path d="M15 7 25 0v31H15z" fill="currentColor" />
        <path d="M28 11 40 18v13H28z" fill="currentColor" opacity=".78" />
      </svg>
      {!compact && (
        <span className={styles.wordmark}>
          <strong>REAL ESTATE</strong>
          <small>VIỆT NAM</small>
        </span>
      )}
    </span>
  )
}
