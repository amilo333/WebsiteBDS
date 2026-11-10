import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import type { ProjectMapUnit } from '../../types'
import {
  formatCompactProjectMapPrice,
  formatProjectMapArea,
} from '../../utils'
import { INQUIRY_STATUS_LABELS } from '../../constants'
import styles from '../../style.module.scss'

type UnitInfoCardProps = {
  unit: ProjectMapUnit
  hasRequested: boolean
  isRequesting: boolean
  hasRequestError: boolean
  onClose: () => void
  onRequestInformation: () => void
}

export function UnitInfoCard({
  unit,
  hasRequested,
  isRequesting,
  hasRequestError,
  onClose,
  onRequestInformation,
}: UnitInfoCardProps) {
  return (
    <aside className={styles.unitInfoCard} aria-live="polite">
      <div className={`${styles.unitInfoHeader} ${unit.isHot ? styles.unitInfoHeaderHot : ''}`}>
        <strong>{unit.isHot ? '🔥 ' : ''}{unit.code}</strong>
        <button type="button" aria-label="Đóng thông tin căn" onClick={onClose}>
          <CloseRoundedIcon />
        </button>
      </div>
      <div className={styles.unitInfoBody}>
        <div className={styles.unitInfoSummary}>
          <span>{formatProjectMapArea(unit.area)}</span>
          <span>{unit.productType ?? 'Chưa cập nhật'}</span>
        </div>

        {unit.statusCode === 'AVAILABLE' && (
          <>
            <div className={styles.unitInfoRow}>
              <span>Giá gốc:</span>
              <strong>{formatCompactProjectMapPrice(unit.price)}</strong>
            </div>
            <div className={styles.unitInfoRow}>
              <span>Giá vay:</span>
              <strong>{formatCompactProjectMapPrice(unit.loanPrice)}</strong>
            </div>
          </>
        )}

        {unit.statusCode && unit.statusCode !== 'AVAILABLE' && (
          <div className={styles.soldNotice}>Đã bán</div>
        )}

        {!unit.statusCode && (
          <>
            <div className={styles.hiddenNotice}>Quỹ hàng Ẩn</div>
            {hasRequested || unit.inquiryStatusCode
              ? (
                  <div className={styles.inquiryStatus}>
                    {hasRequested
                      ? 'Admin sẽ liên hệ sớm nhất'
                      : unit.inquiryStatusName
                        ?? INQUIRY_STATUS_LABELS[unit.inquiryStatusCode ?? '']
                        ?? 'Admin sẽ liên hệ sớm nhất'}
                  </div>
                )
              : (
                  <button
                    type="button"
                    className={styles.inquiryButton}
                    disabled={isRequesting}
                    onClick={onRequestInformation}
                  >
                    {isRequesting ? 'Đang gửi...' : 'Xin thông tin'}
                  </button>
                )}
            {hasRequestError && (
              <small className={styles.inquiryError}>
                Không thể gửi yêu cầu. Vui lòng thử lại.
              </small>
            )}
          </>
        )}
      </div>
    </aside>
  )
}
