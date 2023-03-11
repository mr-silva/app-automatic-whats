import { AxiosRequest, InvalidData, ProviderContract } from '../../../../../framework'

export class BaseProvider extends ProviderContract<AxiosRequest> {
  protected instance: string | undefined
  protected token: string | undefined

  constructor(request: AxiosRequest, instance?: string, token?: string) {
    super(request)

    this.instance = instance
    this.token = token
  }

  private hasInstanceAndToken(): void {
    const instance = this.instance
    const token = this.token

    if (!instance || !token) throw new InvalidData('Instance or token not set.')
  }

  protected getRequest(): AxiosRequest {
    this.hasInstanceAndToken()

    return super.getRequest().withHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'accept-encoding': null
    })
  }
}
