import { ApplicationContext, InvalidUserAuthenticationDataException } from '#framework'

export class BaseUseCaseFactory {
  constructor(protected readonly context?: ApplicationContext) {}

  protected getRequiredAccountId(): string {
    const accountId = this.context?.getAccountId()
    if (!accountId) throw new InvalidUserAuthenticationDataException('Account id is missing')

    return accountId
  }
}
