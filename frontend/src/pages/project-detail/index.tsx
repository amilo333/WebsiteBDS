import { Container } from '@mui/material'
import { PageBreadcrumbs, PageIntro } from '../../components/core'
import { SiteLayout } from '../../components/layouts'
import {
  ProjectHero,
  ProjectZones,
  SectionTabs,
  project,
  useProject,
} from '../../modules/project-detail'

export function ProjectDetailPage() {
  const { data: projectDetails, isPending, isError } = useProject(project.apiId)
  const projectName = projectDetails?.name
    ?? (isPending ? 'Đang tải thông tin dự án...' : 'Dự án')
  const projectDescription = projectDetails?.shortDescription
    ?? (isError
      ? 'Không thể tải thông tin dự án.'
      : `Theo dõi thông tin chi tiết, bảng giá, mặt bằng, tiến độ và chính sách bán hàng dự án ${projectName}.`)

  return (
    <SiteLayout>
      <Container>
        <PageBreadcrumbs
          items={[{ label: 'Dự án' }, { label: projectName }]}
        />
        <PageIntro title={projectName} subtitle={projectDescription} />
        <ProjectHero
          image={project.heroImage}
          alt={`Toàn cảnh ${projectName}`}
        />
        <SectionTabs active="zones" />
        <ProjectZones projectId={project.apiId} />
      </Container>
    </SiteLayout>
  )
}
