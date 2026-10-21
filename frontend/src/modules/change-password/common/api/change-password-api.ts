import { httpClient } from '../../../../api/http-client'
import type { ChangePasswordRequest } from '../types/change-password'

export async function changePassword(payload: ChangePasswordRequest) {
  await httpClient.post('/users/change-password', payload)
}
