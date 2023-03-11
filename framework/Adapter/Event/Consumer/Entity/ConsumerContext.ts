import { RoleTypeEnum } from '../../../../Domain'

export class ConsumerContext {
  private readonly userId: string
  private readonly userEmail: string
  private readonly accountId: string | undefined
  private readonly roleType: RoleTypeEnum

  constructor(accountId?: string) {
    if (accountId) this.accountId = accountId

    this.userId = 'message'
    this.userEmail = `message@1eg.io`
    this.roleType = RoleTypeEnum.SYSTEM
  }

  public getUserId(): string {
    return this.userId
  }

  public getUserEmail(): string {
    return this.userEmail
  }

  public getAccountId(): string | undefined {
    return this.accountId
  }

  public getRoleType(): RoleTypeEnum {
    return this.roleType
  }
}
