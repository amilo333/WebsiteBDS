import { Box } from '@mui/material'
import { useState } from 'react'
import mapPreview from '../../../../assets/projects/ocean-park-masterplan.jpg'
import { hasAuthSession } from '../../../auth'
import { useScrollToProjectSection } from '../../common'
import { DziViewer } from './components/dzi-viewer'
import { ProjectLoginForm } from './components/project-login-form'
import type { ProjectMapAccessProps } from './types'
import styles from './style.module.scss'

export function ProjectMapAccess({ projectId }: ProjectMapAccessProps) {
  useScrollToProjectSection()

  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthSession)

  return (
    <Box component="section" id="mat-bang" className={styles.section}>
      {isAuthenticated ? (
        <DziViewer projectId={projectId} />
      ) : (
        <>
          <img
            src={mapPreview}
            alt=""
            aria-hidden="true"
            className={styles.background}
          />
          <div className={styles.overlay} aria-hidden="true" />
          <div className={styles.content}>
            <ProjectLoginForm onSuccess={() => setIsAuthenticated(true)} />
          </div>
        </>
      )}
    </Box>
  )
}
