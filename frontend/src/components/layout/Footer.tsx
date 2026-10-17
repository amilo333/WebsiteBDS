import { Box, Container, Divider, Link, Stack, Typography } from '@mui/material'
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import { BrandLogo } from '../brand/BrandLogo'

function MapIllustration() {
  return (
    <Box
      component="svg"
      role="img"
      aria-label="Bản đồ văn phòng"
      viewBox="0 0 360 220"
      sx={{ width: '100%', height: '100%', minHeight: 180, bgcolor: '#eaf5f7' }}
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
    </Box>
  )
}

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{ mt: { xs: 6, md: 8 }, color: '#fff', background: 'linear-gradient(112deg, #2154c8 0%, #09bcd0 100%)' }}
    >
      <Container sx={{ py: { xs: 4, md: 5 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.35fr .8fr 1fr' },
            gap: { xs: 4, md: 6 },
            alignItems: 'start',
          }}
        >
          <Stack spacing={2}>
            <BrandLogo inverse compact={false} />
            <Typography sx={{ fontSize: 14, lineHeight: 1.6, maxWidth: 390 }}>
              Nền tảng công nghệ tiên phong số hóa đầu tư lĩnh vực kinh doanh bất động sản tại Việt Nam.
            </Typography>
            <Stack spacing={1.1}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}><PhoneOutlinedIcon fontSize="small" /><Typography sx={{ fontSize: 13 }}>0972 72 9999</Typography></Stack>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}><MailOutlineRoundedIcon fontSize="small" /><Typography sx={{ fontSize: 13 }}>Contact@vietsoftware.com</Typography></Stack>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}><LocationOnOutlinedIcon fontSize="small" /><Typography sx={{ fontSize: 13 }}>SH04-36, Biển Hải 24, KĐT Vinhomes Ocean Park, Xã Gia Lâm, TP Hà Nội, Việt Nam</Typography></Stack>
            </Stack>
          </Stack>

          <Stack spacing={1.1}>
            <Typography sx={{ fontWeight: 800, fontSize: 14 }}>Danh mục</Typography>
            {['Giới thiệu', 'Dự án', 'Liên hệ'].map((item) => (
              <Link key={item} href="#" color="inherit" underline="none" sx={{ fontSize: 13 }}>• &nbsp;{item}</Link>
            ))}
            <Typography sx={{ fontWeight: 800, fontSize: 14, pt: 1 }}>Kết nối</Typography>
            <Stack direction="row" spacing={1.2}>
              {[FacebookRoundedIcon, PhoneOutlinedIcon, MailOutlineRoundedIcon].map((Icon, index) => (
                <Box key={index} sx={{ width: 30, height: 30, borderRadius: '50%', bgcolor: 'rgba(255,255,255,.18)', display: 'grid', placeItems: 'center' }}>
                  <Icon sx={{ fontSize: 17 }} />
                </Box>
              ))}
            </Stack>
          </Stack>

          <Box sx={{ overflow: 'hidden', borderRadius: 1.5, minHeight: 180 }}>
            <MapIllustration />
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,.35)', my: 3 }} />
        <Typography sx={{ fontSize: 12 }}>© 2026 - Realestate. All rights reserved.</Typography>
      </Container>
    </Box>
  )
}
