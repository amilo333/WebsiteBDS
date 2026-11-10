import axios from 'axios'
import type {
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '../types/auth'

const refreshTokenClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function refreshAccessToken(payload: RefreshTokenRequest) {
  const response = await refreshTokenClient.post<RefreshTokenResponse>(
    '/auth/refresh-token',
    payload,
  )

  return response.data.data
}
