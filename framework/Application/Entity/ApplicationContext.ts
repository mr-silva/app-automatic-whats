export class ApplicationContext {
  constructor(private readonly secret?: string, private readonly accountId?: string) {}

  public getAccountId(): string | undefined {
    return this.accountId
  }

  public getSecret(): string | undefined {
    return this.secret
  }
}
