import { ApplicationContext } from '../../../Application/Entity/ApplicationContext'

export class RequestContext {
  constructor(private readonly secret?: string, private readonly accountId?: string) {}

  public getAccountId(): string | undefined {
    return this.accountId
  }

  public getSecret(): string | undefined {
    return this.secret
  }

  public toApplication(): ApplicationContext {
    return new ApplicationContext(this.secret, this.accountId)
  }
}
