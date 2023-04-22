import { HttpMethodEnum, InvalidDataException } from '#framework'
import { BaseProvider } from '../BaseProvider'
import { MessageSendTextResponse } from './Type'

export class MessageProvider extends BaseProvider {
  public async createMessage(phone: string, message: string): Promise<MessageSendTextResponse> {
    try {
      return await this.getRequest()
        .addSegment('send-text')
        .setPayload({
          phone,
          message
        })
        .send(HttpMethodEnum.POST)
    } catch (e) {
      console.error(e)

      throw new InvalidDataException('Could not create message.')
    }
  }
}
