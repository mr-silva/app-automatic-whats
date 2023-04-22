export class BaseResponse<TResponseBody = any> {
  constructor(private statusCode: number, private body: TResponseBody) {}

  public getStatusCode(): number {
    return this.statusCode
  }

  public getBody(): TResponseBody {
    return this.body
  }
}
