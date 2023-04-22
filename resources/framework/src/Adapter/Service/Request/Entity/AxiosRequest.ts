import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import { BaseResponse } from '.'
import { HttpMethodEnum } from '../Enum'
import { BaseRequest } from './BaseRequest'

export class AxiosRequest extends BaseRequest {
  private instance: AxiosInstance
  private initialized: boolean

  constructor(private readonly baseURL: string) {
    super()

    this.instance = axios.create({
      baseURL
    })

    this.initialized = true
  }

  public override getBaseUrl(): string {
    return this.baseURL
  }

  private initialize(): this {
    if (!this.initialized) {
      this.instance = axios.create({
        baseURL: this.baseURL
      })

      this.initialized = true
    }

    return this
  }

  public addRequestInterceptor(
    onFulfilled?: (
      value: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
    onRejected?: (error: any) => any
  ): number {
    return this.instance.interceptors.request.use(onFulfilled, onRejected)
  }

  public removeRequestInterceptor(interceptor: number): this {
    this.instance.interceptors.request.eject(interceptor)
    return this
  }

  public addResponseInterceptor<Value>(
    onFulfilled?: (
      value: AxiosResponse<Value>
    ) => AxiosResponse<Value> | Promise<AxiosResponse<Value>>,
    onRejected?: (error: AxiosError<Value>) => any
  ): number {
    return this.instance.interceptors.response.use(onFulfilled, onRejected)
  }

  public removeResponseInterceptor(interceptor: number): this {
    this.instance.interceptors.response.eject(interceptor)
    return this
  }

  public async send<T = any>(method: HttpMethodEnum): Promise<BaseResponse<T>> {
    if (method) this.method = method

    this.initialize()

    try {
      const response = await this.sendAxiosRequest()

      return new BaseResponse(response.status, response.data)
    } catch (err) {
      throw err
    } finally {
      this.clear()
    }
  }

  public clear(): this {
    super.clear()

    this.initialized = false

    return this
  }

  private getRequestConfig<T = any>(): AxiosRequestConfig<T> {
    return {
      headers: this.getHeaders(),
      params: this.getParameters(),
      data: this.getPayload() || undefined,
      url: this.getSegments().join('/'),
      method: this.method || undefined
    }
  }

  protected async sendAxiosRequest<T = any>(
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return await this.instance.request<T>(config || this.getRequestConfig())
  }
}
