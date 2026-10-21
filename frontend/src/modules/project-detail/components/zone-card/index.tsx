import { Box, Card, CardContent, Typography } from '@mui/material'
import fallbackImage from '../../../../assets/projects/phankhu.png'
import type { ZoneCardProps } from '../../common/types/project'
import styles from './style.module.scss'

export function ZoneCard({ phase }: ZoneCardProps) {
  const name = phase.name.trim() || 'Chưa có tên'
  const image = phase.fileInfo?.fullLink || fallbackImage

  return (
    <Card component="article" elevation={0} className={styles.card}>
      <Box
        component="img"
        src={image}
        alt={`Phối cảnh ${name}`}
        loading="lazy"
        className={styles.image}
      />

      <CardContent className={styles.content}>
        <Typography component="h2" className={styles.name}>
          {name}
        </Typography>
        <Typography className={styles.description}>
          {phase.shortDescription?.trim() || 'Thông tin đang được cập nhật'}
        </Typography>
      </CardContent>
    </Card>
  )
}
