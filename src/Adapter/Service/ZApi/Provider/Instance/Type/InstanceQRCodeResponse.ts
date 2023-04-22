import { BaseResponse } from '#framework'

type InstanceQRCodeResponseBody = {
  value: string
}

export type InstanceQRCodeResponse = BaseResponse<InstanceQRCodeResponseBody>
