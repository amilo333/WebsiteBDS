import { Box } from '@mui/material'
import type { ProjectHeroProps } from '../../common/types/project'
import styles from './style.module.scss'

export function ProjectHero({ image, alt }: ProjectHeroProps) {
  return (
    <Box id="tong-quan" className={styles.hero}>
      <Box component="img" src={image} alt={alt} className={styles.image} />

      <div className={styles.dots} aria-hidden="true">
        <span className={styles.activeDot} />
        <span />
        <span />
      </div>
    </Box>
  )
}
