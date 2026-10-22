import { useEffect } from 'react'

const PROJECT_ZONES_HASH = '#phan-khu'

export function useScrollToProjectSection() {
  useEffect(() => {
    const scrollToProjectZones = () => {
      if (window.location.hash !== PROJECT_ZONES_HASH) return

      document.getElementById(PROJECT_ZONES_HASH.slice(1))?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }

    const animationFrame = window.requestAnimationFrame(scrollToProjectZones)
    window.addEventListener('hashchange', scrollToProjectZones)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('hashchange', scrollToProjectZones)
    }
  }, [])
}
