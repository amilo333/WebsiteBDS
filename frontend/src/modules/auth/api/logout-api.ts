import { httpClient } from '../../../api/http-client'

export async function logout() {
  await httpClient.post('/auth/logout')
}
