import { BaseRequest } from '../Entity'
import { RequestHeaders } from '../Type'

export abstract class RequestProviderContract<TRequest extends BaseRequest> {
  constructor(private readonly request: TRequest) {}

  /**
   * Retorna uma instancia do requisição.
   */
  protected getRequest(): TRequest {
    return this.request.setHeaders(this.getDefaultHeaders())
  }

  /**
   * Retorna os cabeçalhos padrões para a requisição.
   *
   * @returns {RequestHeaders}
   */
  protected getDefaultHeaders(): RequestHeaders {
    return {}
  }
}
