export class Configs {
  constructor(private zApiInstance?: string, private zApiToken?: string) {}

  public getZApiInstance(): string | undefined {
    return this.zApiInstance
  }

  public setZApiInstance(zApiInstance: string): this {
    this.zApiInstance = zApiInstance
    return this
  }

  public getZApiToken(): string | undefined {
    return this.zApiToken
  }

  public setZApiToken(zApiToken: string): this {
    this.zApiToken = zApiToken
    return this
  }
}
