import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { BrandLogo } from '../brand/BrandLogo'

const navigation = [
  { label: 'GIỚI THIỆU', href: '#gioi-thieu' },
  { label: 'DỰ ÁN', href: '/du-an/vinhomes-ocean-park-3' },
  { label: 'TIN TỨC', href: '#tin-tuc' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: '1px solid #e4eaf2', backgroundColor: 'rgba(255,255,255,.97)' }}
    >
      <Container>
        <Toolbar disableGutters sx={{ minHeight: { xs: 58, md: 66 }, justifyContent: 'space-between' }}>
          <Link component={RouterLink} to="/du-an/vinhomes-ocean-park-3" aria-label="Trang chủ">
            <BrandLogo />
          </Link>

          <Stack
            component="nav"
            direction="row"
            spacing={{ md: 4.5, lg: 6 }}
            sx={{ display: { xs: 'none', md: 'flex' }, ml: 8 }}
          >
            {navigation.map((item) => (
              <Link
                key={item.label}
                component={item.href.startsWith('/') ? RouterLink : 'a'}
                to={item.href.startsWith('/') ? item.href : undefined}
                href={item.href.startsWith('#') ? item.href : undefined}
                underline="none"
                color="text.primary"
                sx={{ fontSize: 12, fontWeight: 600, '&:hover': { color: 'primary.main' } }}
              >
                {item.label}
              </Link>
            ))}
          </Stack>

          <Stack direction="row" spacing={{ xs: 1, md: 2.2 }} sx={{ alignItems: 'center' }}>
            <Stack direction="row" spacing={0.7} sx={{ alignItems: 'center' }}>
              <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#02c8b4' }} />
              <Typography sx={{ fontSize: { xs: 9, sm: 10.5 }, color: '#4d596b', whiteSpace: 'nowrap' }}>
                100 người đang Online
              </Typography>
            </Stack>
            <IconButton
              aria-label="Tài khoản"
              sx={{ bgcolor: 'primary.main', color: '#fff', width: 34, height: 34, '&:hover': { bgcolor: 'primary.dark' } }}
            >
              <AccountCircleOutlinedIcon sx={{ fontSize: 21 }} />
            </IconButton>
            <IconButton
              aria-label="Mở menu"
              onClick={() => setOpen(true)}
              sx={{ display: { md: 'none' }, color: 'primary.main' }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 280, p: 2.5 }}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <BrandLogo compact={false} />
            <IconButton onClick={() => setOpen(false)} aria-label="Đóng menu">
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Stack component="nav" spacing={1} sx={{ mt: 2 }}>
            {navigation.map((item) => (
              <Link
                key={item.label}
                component={item.href.startsWith('/') ? RouterLink : 'a'}
                to={item.href.startsWith('/') ? item.href : undefined}
                href={item.href.startsWith('#') ? item.href : undefined}
                onClick={() => setOpen(false)}
                underline="none"
                color="text.primary"
                sx={{ py: 1.3, fontSize: 14, fontWeight: 600 }}
              >
                {item.label}
              </Link>
            ))}
          </Stack>
        </Box>
      </Drawer>
    </AppBar>
  )
}
