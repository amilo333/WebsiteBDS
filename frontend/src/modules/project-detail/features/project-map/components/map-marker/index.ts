import type { ProjectMapUnit } from '../../types'
import {
  formatCompactProjectMapPrice,
  formatProjectMapArea,
} from '../../utils'
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
  onSelect: (unit: ProjectMapUnit) => void,
) {
  const marker = document.createElement('button')
  const header = document.createElement('span')
  const code = document.createElement('strong')
  const details = document.createElement('span')
  const summary = document.createElement('span')
  const area = document.createElement('span')
  const productType = document.createElement('span')

  marker.type = 'button'
  marker.className = `${styles.marker} ${unit.isHot ? styles.markerHot : ''}`
  marker.setAttribute('aria-label', `Thông tin căn ${unit.code}`)
  marker.addEventListener('click', (event) => {
    event.stopPropagation()
    onSelect(unit)
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
  } else {
    const status = document.createElement('span')
    status.className = unit.statusCode
      ? styles.markerSoldStatus
      : styles.markerHiddenStatus
    status.textContent = unit.statusCode ? 'Đã bán' : 'Quỹ hàng Ẩn'
    details.append(status)
  }
  marker.append(header, details)

  return marker
}
