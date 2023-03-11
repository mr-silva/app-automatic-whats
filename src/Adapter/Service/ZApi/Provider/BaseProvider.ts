import { AxiosRequest, ProviderContract } from '../../../../../framework'

export class BaseProvider extends ProviderContract<AxiosRequest> {
  protected getRequest(): AxiosRequest {
    return super.getRequest().withHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'accept-encoding': null
    })
  }
}
