import { useEffect, useState } from 'react'
import styles from './style.module.scss'

type PageIntroProps = {
  title: string
  subtitle: string
}

export function PageIntro({ title, subtitle }: PageIntroProps) {
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!message) return
    const timer = window.setTimeout(() => setMessage(''), 2400)
    return () => window.clearTimeout(timer)
  }, [message])

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, text: subtitle, url: window.location.href })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setMessage('Đã sao chép đường dẫn')
      }
    } catch {
      setMessage('Chưa thể chia sẻ đường dẫn')
    }
  }

  return (
    <>
      <div className={`${styles.intro} d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3`}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <button type="button" className={`${styles.shareButton} btn`} onClick={handleShare}>
          <i className="bi bi-share" aria-hidden="true" />
          Chia sẻ
        </button>
      </div>

      {message && (
        <div className={`${styles.toast} alert alert-primary mb-0`} role="status" aria-live="polite">
          {message}
        </div>
      )}
    </>
  )
}
