import { Container } from '@mui/material'
import { PageBreadcrumbs, PageIntro } from '../../components/core'
import { SiteLayout } from '../../components/layouts'
import {
  ProjectHero,
  ProjectZones,
  SectionTabs,
  project,
} from '../../modules/project-detail'

export function ProjectDetailPage() {
  return (
    <SiteLayout>
      <Container>
        <PageBreadcrumbs
          items={[{ label: 'Dự án' }, { label: 'Vinhomes Ocean Park 3' }]}
        />
        <PageIntro title={project.name} subtitle={project.tagline} />
        <ProjectHero
          image={project.heroImage}
          alt="Toàn cảnh Vinhomes Ocean Park 2 và 3"
        />
        <SectionTabs active="zones" />
        <ProjectZones projectId={project.apiId} />
      </Container>
    </SiteLayout>
  )
}
