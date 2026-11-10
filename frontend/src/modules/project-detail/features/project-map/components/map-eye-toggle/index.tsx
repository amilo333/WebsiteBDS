import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import styles from '../../style.module.scss'

type MapEyeToggleProps = {
  isVisible: boolean
  onToggle: () => void
}

export function MapEyeToggle({ isVisible, onToggle }: MapEyeToggleProps) {
  const label = isVisible ? 'Ẩn tất cả căn' : 'Hiển thị tất cả căn'

  return (
    <button
      type="button"
      className={`${styles.mapEyeToggle} ${isVisible ? styles.mapEyeToggleActive : ''}`}
      aria-label={label}
      aria-pressed={isVisible}
      title={label}
      onClick={onToggle}
    >
      {isVisible
        ? <VisibilityRoundedIcon />
        : <VisibilityOffRoundedIcon />}
    </button>
  )
}
