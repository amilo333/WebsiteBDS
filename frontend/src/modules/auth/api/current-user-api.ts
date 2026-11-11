import { httpClient } from '../../../api/http-client'
import type { CurrentUserResponse } from '../common/types/auth'

export async function getCurrentUser() {
  const response = await httpClient.get<CurrentUserResponse>('/users/me')

  return response.data.data
}
