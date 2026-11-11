import { Container, Typography } from '@mui/material'
import { useParams } from 'react-router'
import { SiteLayout } from '../../components/layouts'

export function UnitDetailPage() {
  const { unitCode } = useParams()

  return (
    <SiteLayout>
      <Container>
        <Typography component="h1">
          Chi tiết căn {unitCode}
        </Typography>
      </Container>
    </SiteLayout>
  )
}
