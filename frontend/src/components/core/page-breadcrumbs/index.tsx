import { Link as RouterLink } from 'react-router'
import { Breadcrumbs, Link, Typography } from '@mui/material'

type BreadcrumbItem = {
  label: string
  href?: string
}

export function PageBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <Breadcrumbs
      separator="/"
      aria-label="Đường dẫn trang"
      sx={{
        py: { xs: 1.4, md: 1.8 },
        '& .MuiBreadcrumbs-separator': { mx: 0.6, color: '#8190a5' },
      }}
    >
      {items.map((item, index) =>
        item.href ? (
          <Link
            key={item.label}
            component={RouterLink}
            to={item.href}
            underline="hover"
            sx={{ color: '#1e5bc4', fontSize: { xs: 10, md: 11.5 }, fontWeight: 600 }}
          >
            {item.label}
          </Link>
        ) : (
          <Typography key={`${item.label}-${index}`} sx={{ color: '#344258', fontSize: { xs: 10, md: 11.5 }, fontWeight: 600 }}>
            {item.label}
          </Typography>
        ),
      )}
    </Breadcrumbs>
  )
}
