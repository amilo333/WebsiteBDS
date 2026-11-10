import { useEffect, useState } from 'react'
import type { ProjectTabKey } from '../types/project'

const HASH_TO_TAB: Record<string, ProjectTabKey> = {
  '#tong-quan': 'overview',
  '#vi-tri': 'location',
  '#phan-khu': 'zones',
  '#mat-bang': 'floorplan',
  '#quy-mo': 'scale',
  '#chinh-sach': 'policy',
  '#tin-tuc': 'news',
}

function getActiveTab() {
  if (typeof window === 'undefined') return 'zones'

  return HASH_TO_TAB[window.location.hash] ?? 'zones'
}

export function useActiveProjectTab() {
  const [activeTab, setActiveTab] = useState<ProjectTabKey>(getActiveTab)

  useEffect(() => {
    const updateActiveTab = () => setActiveTab(getActiveTab())

    window.addEventListener('hashchange', updateActiveTab)

    return () => window.removeEventListener('hashchange', updateActiveTab)
  }, [])

  return activeTab
}
