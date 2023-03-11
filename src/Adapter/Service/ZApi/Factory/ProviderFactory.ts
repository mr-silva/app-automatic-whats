import { AxiosRequest } from '../../../../../framework'
import { MessageProvider } from '../Provider'

export class ProviderFactory {
  protected buildAxiosRequest(): AxiosRequest {
    return new AxiosRequest(process.env.ZAPI_BASE_URL!)
  }

  public buildMessageProvider() {
    return new MessageProvider(this.buildAxiosRequest())
  }
}
