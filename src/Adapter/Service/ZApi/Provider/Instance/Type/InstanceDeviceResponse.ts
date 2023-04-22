import { BaseResponse } from '#framework'

type InstanceDeviceResponseBody = {
  phone: string
  imgUrl: string
  name: string
  device: {
    sessionName: string
    device_model: string
  }
  sessionId: number
  isBusiness: boolean
}

export type InstanceDeviceResponse = BaseResponse<InstanceDeviceResponseBody>
