import { httpClient } from '../../../../../api/http-client'
import type {
  CreateUnitInquiryRequest,
  ProjectMapResponse,
} from '../types'

export async function createUnitInquiry(payload: CreateUnitInquiryRequest) {
  const response = await httpClient.post<ProjectMapResponse<unknown>>(
    '/portal/units-inquiry/create',
    payload,
  )

  return response.data
}
