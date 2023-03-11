import { HttpMethodEnum, InvalidData } from '../../../../../framework'
import { BaseProvider } from './BaseProvider'

export class MessageProvider extends BaseProvider {
  public async createMessage(phone: string, message: string): Promise<string> {
    try {
      const response = (
        await this.getRequest()
          .withEndpoint(
            `/instances/${process.env.ZAPI_INSTANCE}/token/${process.env.ZAPI_TOKEN}/send-text`
          )
          .withPayload({
            phone,
            message
          })
          .send<{ messageId: string }>(HttpMethodEnum.POST)
      ).getBody()

      return response.messageId
    } catch (e) {
      console.error(e)

      throw new InvalidData('Could not create message.')
    }
  }
}
