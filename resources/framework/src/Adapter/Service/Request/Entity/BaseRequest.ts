import { BaseResponse } from './BaseResponse'
import { HttpMethodEnum } from '../Enum'
import { RequestHeaders, RequestParameters } from '../Type'
import { URLSearchParams } from 'url'

export abstract class BaseRequest {
  protected baseUrl: string | null
  protected segments: string[]

  protected headers: RequestHeaders
  protected parameters: RequestParameters

  protected payload: any | null
  protected method: HttpMethodEnum | null

  constructor() {
    this.baseUrl = null
    this.segments = []

    this.headers = {}
    this.parameters = {}
    this.payload = null
    this.method = null
  }

  public clear(): this {
    this.baseUrl = null
    this.segments = []

    this.headers = {}
    this.parameters = {}
    this.payload = null
    this.method = null
    return this
  }

  public abstract send<TResponseBody = any>(
    method?: HttpMethodEnum
  ): Promise<BaseResponse<TResponseBody>>

  public setBaseUrl(baseUrl: string): this {
    this.baseUrl = baseUrl
    return this
  }

  public getBaseUrl(): string | null {
    return this.baseUrl
  }

  public setSegments(segments: string[]): this {
    this.segments = segments
    return this
  }

  public addSegment(segment: string): this {
    this.segments.push(segment)
    return this
  }

  public getSegments(): string[] {
    return this.segments
  }

  public setHeaders(headers: RequestHeaders): this {
    this.headers = headers
    return this
  }

  public addHeader(name: string, value: string): this {
    this.headers[name] = value
    return this
  }

  public getHeaders(): RequestHeaders {
    return this.headers
  }

  public setParameters(parameters: RequestParameters): this {
    this.parameters = parameters
    return this
  }

  public addParameter(name: string, value: string): this {
    this.parameters[name] = value
    return this
  }

  public getParameters(): RequestParameters {
    return this.parameters
  }

  public setPayload<TPayload = any>(payload: TPayload): this {
    this.payload = payload
    return this
  }

  public getPayload<TPayload = any>(): TPayload | null {
    return this.payload
  }

  public setMethod(method: HttpMethodEnum): this {
    this.method = method
    return this
  }

  public getMethod(): HttpMethodEnum | null {
    return this.method
  }

  /**
   * Returns the url with all segments concatenated.
   */
  public getUrl() {
    const baseUrl = this.getBaseUrl()?.endsWith('/')
      ? this.getBaseUrl()?.slice(0, -1)
      : this.getBaseUrl()

    if (!baseUrl) throw new Error('No base URL provided')

    return this.getSegments().length ? baseUrl + '/' + this.getSegments().join('/') : baseUrl
  }

  /**
   * Returns the url with all segments and parameters
   */
  public getFullUrl() {
    const url = this.getUrl()

    const parameters = new URLSearchParams(this.getParameters())

    return url + url.includes('?') ? '&' : '?' + parameters.toString()
  }
}
