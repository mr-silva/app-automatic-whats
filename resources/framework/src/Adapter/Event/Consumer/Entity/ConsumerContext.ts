import { RoleTypeEnum } from '../../../../Domain'

export class ConsumerContext {
  private readonly userId: string
  private readonly userEmail: string
  private readonly roleType: RoleTypeEnum

  constructor() {
    this.userId = 'message'
    this.userEmail = `message@mb.io`
    this.roleType = RoleTypeEnum.SYSTEM
  }

  public getUserId(): string {
    return this.userId
  }

  public getUserEmail(): string {
    return this.userEmail
  }

  public getRoleType(): RoleTypeEnum {
    return this.roleType
  }
}
