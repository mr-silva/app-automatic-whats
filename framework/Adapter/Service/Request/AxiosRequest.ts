import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ProviderInstanceNotCreatedException } from '../Provider/Exception'
import { HttpMethodEnum } from '../Enum'
import { ProviderResponse } from '../Provider/Entity'
import { BaseRequest } from './BaseRequest'

export class AxiosRequest extends BaseRequest<AxiosInstance> {
  constructor(private baseURL: string) {
    super()
  }

  public clear(): this {
    this.instance = null
    this.params = null
    this.payload = null
    this.endpoint = null
    this.logIdentifier = null
    return this
  }

  public createInstance(): this {
    if (!this.instance)
      this.instance = axios.create({
        baseURL: this.baseURL
      })

    return this
  }

  public withHeaders(headers: any): this {
    if (!this.instance) throw new ProviderInstanceNotCreatedException()

    this.instance.defaults.headers = headers
    return this
  }

  public addHeader(name: string, value: string): this {
    if (!this.instance) throw new ProviderInstanceNotCreatedException()

    this.instance.defaults.headers = {
      ...this.instance.defaults.headers,
      [name]: value
    }
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
    let endpoint = this.endpoint
    const allParams = this.params
    if (allParams) {
      const params: string[] = []
      Object.keys(allParams).forEach(key => {
        params.push(`${key}=${allParams[key]}`)
      })

      endpoint += `${endpoint?.includes('?') ? '&' : '?'}${params.join('&')}`
    }

    return endpoint
  }

  // public addRequestInterceptor(
  //   onFulfilled?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
  //   onRejected?: (error: any) => any
  // ): number {
  //   if (!this.instance) throw new ProviderInstanceNotCreatedException()

  //   return this.instance.interceptors.request.use(onFulfilled, onRejected)
  // }

  public removeRequestInterceptor(interceptor: number): this {
    if (!this.instance) throw new ProviderInstanceNotCreatedException()

    this.instance.interceptors.request.eject(interceptor)
    return this
  }

  public addResponseInterceptor<Value>(
    onFulfilled?: (
      value: AxiosResponse<Value>
    ) => AxiosResponse<Value> | Promise<AxiosResponse<Value>>,
    onRejected?: (error: AxiosError<Value>) => any
  ): number {
    if (!this.instance) throw new ProviderInstanceNotCreatedException()

    return this.instance.interceptors.response.use(onFulfilled, onRejected)
  }

  public removeResponseInterceptor(interceptor: number): this {
    if (!this.instance) throw new ProviderInstanceNotCreatedException()

    this.instance.interceptors.response.eject(interceptor)
    return this
  }

  public async send<T = any>(method: HttpMethodEnum): Promise<ProviderResponse<T>> {
    if (!this.instance) throw new ProviderInstanceNotCreatedException()

    const fullEndpoint = this.getFullEndpoint()

    if (!fullEndpoint) throw new Error('Endpoint is not set.')

    try {
      let response: AxiosResponse<T>

      switch (method) {
        case HttpMethodEnum.DELETE:
          response = await this.instance.delete(fullEndpoint, {
            data: this.getPayload()
          })
          break

        case HttpMethodEnum.GET:
          response = await this.instance.get(fullEndpoint)
          break

        case HttpMethodEnum.PATCH:
          response = await this.instance.patch(fullEndpoint, this.getPayload())
          break

        case HttpMethodEnum.POST:
          response = await this.instance.post(fullEndpoint, this.getPayload())
          break

        case HttpMethodEnum.PUT:
          response = await this.instance.put(fullEndpoint, this.getPayload())
          break
      }

      return new ProviderResponse(response.status, response.data)
    } catch (err) {
      throw err
    } finally {
      this.clear()
    }
  }

  public async retry<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    if (!this.instance) throw new ProviderInstanceNotCreatedException()

    return await this.instance.request(config)
  }
}
