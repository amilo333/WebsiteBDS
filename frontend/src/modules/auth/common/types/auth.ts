import type { ReactNode } from 'react'
import type { z } from 'zod'
import type { loginSchema } from '../schemas/login-schema'

export type LoginRequest = z.infer<typeof loginSchema>

export type AuthSession = {
  accessToken: string
  refreshToken: string
  accessExpiredAt: string
  refreshExpiredAt: string
  accessExpiresIn: number
  refreshExpiresIn: number
}

export type ApiResponse<TData> = {
  code: string
  message: string
  debug: unknown | null
  requestId: string
  serverTime: string
  pageNumber: number | null
  pageSize: number | null
  totalElements: number | null
  totalPages: number | null
  data: TData
}

export type LoginResponse = ApiResponse<AuthSession>

export type UserFileInfo = {
  fullLink?: string | null
}

export type CurrentUser = {
  id: number
  code: string
  phone: string
  email: string
  fullName: string
  birthday: string | null
  emailVerified: boolean
  isLocked: boolean
  role: string
  referrerId: number | null
  referrerPhone: string | null
  referrerFullName: string | null
  fileInfo: UserFileInfo | null
}

export type CurrentUserResponse = ApiResponse<CurrentUser>

export type AuthApiError = {
  message?: string
}

export type ProtectedRouteProps = {
  children: ReactNode
}
