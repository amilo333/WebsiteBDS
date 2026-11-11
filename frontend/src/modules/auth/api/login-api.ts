import { httpClient } from '../../../api/http-client'
import type { LoginRequest, LoginResponse } from '../common/types/auth'

export async function login(payload: LoginRequest) {
  const response = await httpClient.post<LoginResponse>('/auth/login', payload)

  return response.data.data
}
