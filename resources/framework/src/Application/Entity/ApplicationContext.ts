export class ApplicationContext {
  constructor(private readonly accountId?: string) {}

  public getAccountId(): string | undefined {
    return this.accountId
  }
}
