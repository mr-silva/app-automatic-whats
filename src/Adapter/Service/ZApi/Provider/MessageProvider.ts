import { HttpMethodEnum, InvalidDataException } from '#framework'
import { BaseProvider } from './BaseProvider'

export class MessageProvider extends BaseProvider {
  public async createMessage(phone: string, message: string): Promise<string> {
    try {
      const response = (
        await this.getRequest()
          .addSegment(`send-text`)
          .setPayload({
            phone,
            message
          })
          .send<{ messageId: string }>(HttpMethodEnum.POST)
      ).getBody()

      return response.messageId
    } catch (e) {
      console.error(e)

      throw new InvalidDataException('Could not create message.')
    }
  }
}
