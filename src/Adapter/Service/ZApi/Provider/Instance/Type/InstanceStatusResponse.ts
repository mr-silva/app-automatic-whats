import { BaseResponse } from '#framework'

type InstanceStatusResponseBody = {
  connected: boolean
  error: string
  smartphoneConnected: boolean
}

export type InstanceStatusResponse = BaseResponse<InstanceStatusResponseBody>
