import { BrandLogo } from '../../core'
import styles from './style.module.scss'

function MapIllustration() {
  return (
    <svg
      role="img"
      aria-label="Bản đồ văn phòng"
      viewBox="0 0 360 220"
      className={styles.map}
    >
      <rect width="360" height="220" fill="#eaf5f7" />
      <path d="M-20 24 92 96 190 62 380 150" stroke="#c4dbe0" strokeWidth="12" fill="none" />
      <path d="m20 230 56-88 72-20 38-90M225-20l-10 73 74 28 82-14" stroke="#fff" strokeWidth="9" fill="none" />
      <path d="M-20 170 78 130l65 35 92-45 145 68" stroke="#b6d2d9" strokeWidth="5" fill="none" />
      <path d="M195-20c14 48 29 74 73 103s54 82 48 157" stroke="#9fd4e0" strokeWidth="10" fill="none" />
      <circle cx="202" cy="103" r="16" fill="#ff7a45" stroke="#fff" strokeWidth="5" />
      <path d="M202 88c-8 0-14 6-14 14 0 10 14 24 14 24s14-14 14-24c0-8-6-14-14-14Zm0 19a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z" fill="#fff" />
      <rect x="214" y="83" width="126" height="38" rx="8" fill="#fff" />
      <text x="228" y="99" fontSize="10" fontWeight="700" fill="#ef6738">Chi nhánh Hà Nội</text>
      <text x="228" y="113" fontSize="8" fill="#758394">Vinhomes Ocean Park</text>
    </svg>
  )
}

const contactItems = [
  { icon: 'bi-telephone', text: '0972 72 9999' },
  { icon: 'bi-envelope', text: 'Contact@vietsoftware.com' },
  { icon: 'bi-geo-alt', text: 'SH04-36, Biển Hải 24, KĐT Vinhomes Ocean Park, Xã Gia Lâm, TP Hà Nội, Việt Nam' },
]

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container py-5">
        <div className="row g-4 g-lg-5 align-items-start">
          <div className="col-12 col-md-5">
            <BrandLogo inverse compact={false} />
            <p className={styles.description}>
              Nền tảng công nghệ tiên phong số hóa đầu tư lĩnh vực kinh doanh bất động sản tại Việt Nam.
            </p>
            <ul className={`${styles.contactList} list-unstyled mb-0`}>
              {contactItems.map((item) => (
                <li key={item.icon}>
                  <i className={`bi ${item.icon}`} aria-hidden="true" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-md-3 col-lg-2">
            <h2 className={styles.heading}>Danh mục</h2>
            <ul className={`${styles.footerLinks} list-unstyled`}>
              {['Giới thiệu', 'Dự án', 'Liên hệ'].map((item) => (
                <li key={item}><a href="#">{item}</a></li>
              ))}
            </ul>
            <h2 className={`${styles.heading} mt-4`}>Kết nối</h2>
            <div className="d-flex gap-2">
              {['bi-facebook', 'bi-telephone', 'bi-envelope'].map((icon) => (
                <a key={icon} href="#" className={styles.social} aria-label="Kênh liên hệ">
                  <i className={`bi ${icon}`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="col-12 col-md-4 col-lg-5">
            <div className={styles.mapFrame}><MapIllustration /></div>
          </div>
        </div>
        <div className={styles.copyright}>© 2026 - Realestate. All rights reserved.</div>
      </div>
    </footer>
  )
}
