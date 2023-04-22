import { BaseResponse } from '#framework'

type MessageSendTextResponseBody = {
  zaapId: string
  messageId: string
  id: string
}

export type MessageSendTextResponse = BaseResponse<MessageSendTextResponseBody>
