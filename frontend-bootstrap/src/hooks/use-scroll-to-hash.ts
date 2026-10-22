import { useEffect } from 'react'

export function useScrollToHash(hash: `#${string}`) {
  useEffect(() => {
    const scrollToTarget = () => {
      if (window.location.hash !== hash) return

      document.getElementById(hash.slice(1))?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }

    const animationFrame = window.requestAnimationFrame(scrollToTarget)
    window.addEventListener('hashchange', scrollToTarget)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('hashchange', scrollToTarget)
    }
  }, [hash])
}
