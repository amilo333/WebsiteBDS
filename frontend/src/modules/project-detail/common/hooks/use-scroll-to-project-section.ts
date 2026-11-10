import { useEffect } from 'react'

const PROJECT_SECTION_HASHES = new Set(['#phan-khu', '#mat-bang'])

export function useScrollToProjectSection() {
  useEffect(() => {
    const scrollToProjectSection = () => {
      const currentHash = window.location.hash

      if (!PROJECT_SECTION_HASHES.has(currentHash)) return

      document.getElementById(currentHash.slice(1))?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }

    const animationFrame = window.requestAnimationFrame(scrollToProjectSection)
    window.addEventListener('hashchange', scrollToProjectSection)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('hashchange', scrollToProjectSection)
    }
  }, [])
}
