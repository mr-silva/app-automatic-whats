import { AxiosRequest, InvalidDataException, RequestProviderContract } from '#framework'

export class BaseProvider extends RequestProviderContract<AxiosRequest> {
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

    if (!instance || !token) throw new InvalidDataException('Instance or token not set.')
  }

  protected getRequest(): AxiosRequest {
    this.hasInstanceAndToken()

    return super
      .getRequest()
      .setHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'accept-encoding': 'null'
      })
      .addSegment('instances')
      .addSegment(`${this.instance}`)
      .addSegment('token')
      .addSegment(`${this.token}`)
  }
}
