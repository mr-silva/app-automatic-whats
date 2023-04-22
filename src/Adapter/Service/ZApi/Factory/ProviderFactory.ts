import { AxiosRequest } from '#framework'
import { MessageProvider } from '../Provider'

export class ProviderFactory {
  private instance: string | undefined
  private token: string | undefined

  public setInstance(instance: string | undefined): this {
    this.instance = instance
    return this
  }

  public setToken(token: string | undefined): this {
    this.token = token
    return this
  }

  protected buildAxiosRequest(): AxiosRequest {
    return new AxiosRequest(process.env.ZAPI_BASE_URL!)
  }

  public buildMessageProvider() {
    return new MessageProvider(this.buildAxiosRequest(), this.instance, this.token)
  }
}
