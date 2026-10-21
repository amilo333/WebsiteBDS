import {
  Avatar,
  Box,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import { useNavigate } from 'react-router'
import avatarImage from '../../../../assets/projects/avt.png'
import { AppButton } from '../../../../components/core'
import { clearAuthSession, useCurrentUser } from '../../../auth'
import styles from './style.module.scss'

export function AccountPanel() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: currentUser, isPending, isError } = useCurrentUser()

  const profileDetails = currentUser
    ? [
        {
          id: 'phone',
          icon: PhoneOutlinedIcon,
          value: currentUser.phone || 'Chưa cập nhật',
        },
        {
          id: 'email',
          icon: EmailOutlinedIcon,
          value: currentUser.email || 'Chưa cập nhật',
        },
        {
          id: 'role',
          icon: BusinessCenterOutlinedIcon,
          value: currentUser.referrerFullName
            ? `CTV của ${currentUser.referrerFullName}`
            : currentUser.role || 'Chưa cập nhật',
        },
      ]
    : []

  const handleLogout = () => {
    clearAuthSession()
    queryClient.clear()
    navigate('/dang-nhap', { replace: true })
  }

  return (
    <Box component="aside" aria-label="Thông tin tài khoản" className={styles.panel}>
      <Stack className={styles.identity}>
        <Avatar
          className={styles.avatar}
          src={currentUser?.fileInfo?.fullLink || avatarImage}
          alt={currentUser?.fullName || 'Ảnh đại diện'}
        />
        {isPending ? (
          <Skeleton width={130} height={23} />
        ) : (
          <Typography className={styles.name}>
            {currentUser?.fullName || 'Chưa cập nhật'}
          </Typography>
        )}
      </Stack>

      <Stack className={styles.details}>
        {isPending
          ? [1, 2, 3].map((item) => (
              <Skeleton key={item} height={22} />
            ))
          : profileDetails.map(({ id, icon: Icon, value }) => (
              <Stack key={id} direction="row" spacing={1.2} className={styles.detailRow}>
                <Icon className={styles.detailIcon} />
                <Typography className={styles.detailText}>{value}</Typography>
              </Stack>
            ))}
        {isError && (
          <Typography role="alert" className={styles.errorMessage}>
            Không thể tải thông tin cá nhân
          </Typography>
        )}
      </Stack>

      <Divider className={styles.divider} />

      <Stack className={styles.actions}>
        <AppButton gradient fullWidth className={styles.actionButton} startIcon={<ForwardToInboxOutlinedIcon />}>
          Giới thiệu bạn bè
        </AppButton>
        <AppButton
          fullWidth
          className={`${styles.actionButton} ${styles.activeButton}`}
          startIcon={<LockOutlinedIcon />}
        >
          Đổi mật khẩu
        </AppButton>
        <Divider className={styles.logoutDivider} />
        <AppButton
          fullWidth
          variant="outlined"
          onClick={handleLogout}
          className={`${styles.actionButton} ${styles.logoutButton}`}
          startIcon={<LogoutOutlinedIcon />}
        >
          Đăng xuất
        </AppButton>
      </Stack>
    </Box>
  )
}
