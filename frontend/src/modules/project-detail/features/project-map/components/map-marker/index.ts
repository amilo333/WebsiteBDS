import type { ProjectMapUnit } from '../../types'
import {
  formatCompactProjectMapPrice,
  formatProjectMapArea,
} from '../../utils'
import { INQUIRY_STATUS_LABELS } from '../../constants'
import styles from '../../style.module.scss'

function addMarkerRow(
  container: HTMLElement,
  label: string,
  value: string,
  className?: string,
) {
  const row = document.createElement('span')
  const labelElement = document.createElement('small')
  const valueElement = document.createElement('strong')

  row.className = className ?? ''
  labelElement.textContent = label
  valueElement.textContent = value
  row.append(labelElement, valueElement)
  container.append(row)
}

export function createMarkerElement(
  unit: ProjectMapUnit,
  onOpenDetail: (unit: ProjectMapUnit) => void,
  onRequestInformation: (unit: ProjectMapUnit) => Promise<void>,
) {
  const marker = document.createElement('div')
  const header = document.createElement('span')
  const code = document.createElement('strong')
  const details = document.createElement('span')
  const summary = document.createElement('span')
  const area = document.createElement('span')
  const productType = document.createElement('span')
  let pointerStart: { x: number; y: number } | null = null

  marker.className = `${styles.marker} ${unit.isHot ? styles.markerHot : ''}`
  marker.tabIndex = 0
  marker.setAttribute('role', 'button')
  marker.setAttribute('aria-label', `Thông tin căn ${unit.code}`)
  marker.addEventListener('pointerdown', (event) => {
    event.stopPropagation()
    pointerStart = { x: event.clientX, y: event.clientY }
  })
  marker.addEventListener('pointerup', (event) => {
    event.stopPropagation()
    if (!pointerStart) return

    const movedX = Math.abs(event.clientX - pointerStart.x)
    const movedY = Math.abs(event.clientY - pointerStart.y)
    pointerStart = null
    if (movedX <= 5 && movedY <= 5) onOpenDetail(unit)
  })
  marker.addEventListener('pointercancel', () => {
    pointerStart = null
  })
  marker.addEventListener('click', (event) => {
    event.preventDefault()
    event.stopPropagation()
  })
  marker.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    onOpenDetail(unit)
  })
  header.className = styles.markerHeader
  code.textContent = unit.code

  if (unit.isHot) {
    const hotIcon = document.createElement('span')
    hotIcon.className = styles.markerFire
    hotIcon.textContent = '🔥'
    header.append(hotIcon)
  }

  header.append(code)
  details.className = styles.markerDetails
  summary.className = styles.markerSummary
  area.textContent = formatProjectMapArea(unit.area)
  productType.textContent = unit.productType ?? 'Chưa cập nhật'
  summary.append(area, productType)
  details.append(summary)

  if (unit.statusCode === 'AVAILABLE') {
    addMarkerRow(
      details,
      'Giá gốc:',
      formatCompactProjectMapPrice(unit.price),
      styles.markerPrice,
    )
    addMarkerRow(
      details,
      'Giá vay:',
      formatCompactProjectMapPrice(unit.loanPrice),
      styles.markerPrice,
    )
  } else if (unit.statusCode) {
    const status = document.createElement('span')
    status.className = styles.markerSoldStatus
    status.textContent = 'Đã bán'
    details.append(status)
  } else {
    const status = document.createElement('span')
    status.className = styles.markerHiddenStatus
    status.textContent = 'Quỹ hàng Ẩn'
    details.append(status)

    if (unit.inquiryStatusCode) {
      const inquiryStatus = document.createElement('span')
      inquiryStatus.className = styles.inquiryStatus
      inquiryStatus.textContent = unit.inquiryStatusName
        ?? INQUIRY_STATUS_LABELS[unit.inquiryStatusCode]
        ?? 'Admin sẽ liên hệ sớm nhất'
      details.append(inquiryStatus)
    } else {
      const inquiryButton = document.createElement('button')
      const inquiryError = document.createElement('small')
      inquiryButton.type = 'button'
      inquiryButton.className = styles.inquiryButton
      inquiryButton.textContent = 'Xin thông tin'
      inquiryError.className = styles.inquiryError
      inquiryError.textContent = 'Không thể gửi yêu cầu. Vui lòng thử lại.'
      inquiryError.hidden = true

      inquiryButton.addEventListener('click', async (event) => {
        event.stopPropagation()
        inquiryButton.disabled = true
        inquiryButton.textContent = 'Đang gửi...'
        inquiryError.hidden = true

        try {
          await onRequestInformation(unit)
          const inquiryStatus = document.createElement('span')
          inquiryStatus.className = styles.inquiryStatus
          inquiryStatus.textContent = 'Admin sẽ liên hệ sớm nhất'
          inquiryButton.replaceWith(inquiryStatus)
          inquiryError.remove()
        } catch {
          inquiryButton.disabled = false
          inquiryButton.textContent = 'Xin thông tin'
          inquiryError.hidden = false
        }
      })
      inquiryButton.addEventListener('pointerdown', (event) => {
        event.stopPropagation()
        pointerStart = null
      })
      inquiryButton.addEventListener('pointerup', (event) => {
        event.stopPropagation()
      })
      details.append(inquiryButton, inquiryError)
    }
  }
  marker.append(header, details)

  return marker
}
