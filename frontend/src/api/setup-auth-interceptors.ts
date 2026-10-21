import axios from 'axios'
import {
  clearAuthSession,
  getAccessToken,
} from '../modules/auth/common/services/auth-session'
import { httpClient } from './http-client'

let isConfigured = false

export function setupAuthInterceptors() {
  if (isConfigured) return

  isConfigured = true

  httpClient.interceptors.request.use((config) => {
    const accessToken = getAccessToken()

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  })

  httpClient.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        window.location.pathname !== '/dang-nhap'
      ) {
        clearAuthSession()
        window.location.assign('/dang-nhap')
      }

      return Promise.reject(error)
    },
  )
}
