import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { refreshAccessToken } from '../modules/auth/api/refresh-token-api'
import {
  clearAuthSession,
  getAuthSession,
  getRefreshToken,
  isAccessTokenExpired,
  saveAuthSession,
} from '../modules/auth/common/services/auth-session'
import type { AuthSession } from '../modules/auth/common/types/auth'
import { httpClient } from './http-client'

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean
}

let isConfigured = false
let refreshSessionPromise: Promise<AuthSession> | null = null

function isLoginRequest(url?: string) {
  return Boolean(url?.includes('/auth/login'))
}

function redirectToLogin() {
  clearAuthSession()

  if (window.location.pathname !== '/dang-nhap') {
    window.location.assign('/dang-nhap')
  }
}

async function refreshAuthSession() {
  if (refreshSessionPromise) return refreshSessionPromise

  const refreshToken = getRefreshToken()
  if (!refreshToken) throw new Error('Refresh token is unavailable')

  refreshSessionPromise = refreshAccessToken({ refreshToken })
    .then((session) => {
      saveAuthSession(session)
      return session
    })
    .finally(() => {
      refreshSessionPromise = null
    })

  return refreshSessionPromise
}

export function setupAuthInterceptors() {
  if (isConfigured) return

  isConfigured = true

  httpClient.interceptors.request.use(async (config) => {
    if (isLoginRequest(config.url)) return config

    const currentSession = getAuthSession()
    if (!currentSession) return config

    try {
      const session = isAccessTokenExpired(currentSession)
        ? await refreshAuthSession()
        : currentSession
      config.headers.Authorization = `Bearer ${session.accessToken}`
      return config
    } catch (error) {
      redirectToLogin()
      return Promise.reject(error)
    }
  })

  httpClient.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
      if (!axios.isAxiosError(error) || error.response?.status !== 401) {
        return Promise.reject(error)
      }

      const originalRequest = error.config as RetryableRequestConfig | undefined
      if (!originalRequest || originalRequest._retry || isLoginRequest(originalRequest.url)) {
        redirectToLogin()
        return Promise.reject(error)
      }

      originalRequest._retry = true

      try {
        const session = await refreshAuthSession()
        originalRequest.headers.Authorization = `Bearer ${session.accessToken}`
        return httpClient(originalRequest)
      } catch (refreshError) {
        redirectToLogin()
        return Promise.reject(refreshError)
      }
    },
  )
}
