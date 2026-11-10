import { Container } from '@mui/material'
import { SiteLayout } from '../../components/layouts'
import {
  PageBreadcrumbs,
  PageIntro,
  ProjectHero,
  ProjectMapAccess,
  ProjectZones,
  SectionTabs,
  project,
  useActiveProjectTab,
  useProject,
} from '../../modules/project-detail'

export function ProjectDetailPage() {
  const activeTab = useActiveProjectTab()
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
        <SectionTabs active={activeTab} />
        {activeTab === 'floorplan' ? (
          <ProjectMapAccess projectId={project.apiId} />
        ) : (
          <ProjectZones projectId={project.apiId} />
        )}
      </Container>
    </SiteLayout>
  )
}
