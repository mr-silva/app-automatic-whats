import { ProviderResponse } from '../Provider/Entity'
import { HttpMethodEnum } from '../Enum'

export abstract class BaseRequest<TInstance = any> {
  protected instance: TInstance | null
  protected params: IParams | null
  protected payload: any | null
  protected endpoint: string | null
  protected headers: { [key: string]: string } | null
  protected logIdentifier: string | null

  constructor() {
    this.instance = null
    this.params = null
    this.payload = null
    this.endpoint = null
    this.headers = null
    this.logIdentifier = null
  }

  public clear(): this {
    this.instance = null
    this.params = null
    this.payload = null
    this.endpoint = null
    this.logIdentifier = null
    return this
  }

  abstract createInstance(): this

  public withEndpoint(endpoint: string): this {
    this.endpoint = endpoint
    return this
  }

  public withHeaders(headers: any): this {
    this.headers = headers
    return this
  }

  public addHeader(name: string, value: string): this {
    this.headers = {
      ...this.headers,
      [name]: value
    }
    return this
  }

  public withParams(params: IParams): this {
    this.params = params
    return this
  }

  public addParam(name: string, value: string): this {
    this.params = {
      ...this.params,
      [name]: value
    }
    return this
  }

  public getParams(): IParams | null {
    return this.params
  }

  public withPayload(payload: any): this {
    this.payload = payload
    return this
  }

  public withLogIdentifier(logIdentifier: string): this {
    this.logIdentifier = logIdentifier
    return this
  }

  public getLogIdentifier(): string | null {
    return this.logIdentifier
  }

  public getFullEndpoint(): string | null {
    return this.endpoint
  }

  public getPayload(): any {
    return this.payload
  }

  public abstract send<T = any>(method: HttpMethodEnum): Promise<ProviderResponse<T>>
}

export interface IParams {
  [key: string]: string | number | boolean
}
