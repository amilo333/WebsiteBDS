import fallbackImage from '../../assets/projects/phankhu.png'
import type { Phase } from '../../types/project'
import styles from './ZoneCard.module.css'

export function ZoneCard({ phase }: { phase: Phase }) {
  const name = phase.name.trim() || 'Chưa có tên'
  const image = phase.fileInfo?.fullLink || fallbackImage

  return (
    <article className={`${styles.card} card h-100 border-0`}>
      <img
        src={image}
        alt={`Phối cảnh ${name}`}
        loading="lazy"
        className={styles.image}
      />
      <div className="card-body px-0 pt-3 pb-0">
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.description}>
          {phase.shortDescription?.trim() || 'Thông tin đang được cập nhật'}
        </p>
      </div>
    </article>
  )
}
