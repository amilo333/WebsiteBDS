import { Box, Typography } from '@mui/material'

interface BrandLogoProps {
  inverse?: boolean
  compact?: boolean
}

export function BrandLogo({ inverse = false, compact = true }: BrandLogoProps) {
  const color = inverse ? '#ffffff' : '#1d5bc7'

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
      <Box
        component="svg"
        viewBox="0 0 42 38"
        aria-label="BDS Việt Nam"
        sx={{ width: { xs: 32, md: 36 }, height: { xs: 29, md: 33 }, flex: '0 0 auto' }}
      >
        <path d="M2 15.5 12 8v23H2z" fill={color} opacity=".9" />
        <path d="M15 7 25 0v31H15z" fill={color} />
        <path d="M28 11 40 18v13H28z" fill={color} opacity=".78" />
      </Box>
      {!compact && (
        <Box>
          <Typography sx={{ color, fontWeight: 800, fontSize: 14, lineHeight: 1.05 }}>
            REAL ESTATE
          </Typography>
          <Typography sx={{ color, fontWeight: 600, fontSize: 9, letterSpacing: '.12em' }}>
            VIỆT NAM
          </Typography>
        </Box>
      )}
    </Box>
  )
}
