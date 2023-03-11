import { InvalidUserAuthenticationData } from '../../../../framework'

export class BaseUseCaseFactory {
  constructor(protected accountId?: string) {}

  protected getRequiredAccountId(): string {
    const accountId = this.accountId
    if (!accountId) throw new InvalidUserAuthenticationData('Account id is missing')

    return accountId
  }
}
