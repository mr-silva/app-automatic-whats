import { InvalidUserAuthenticationData } from '../../../../framework'
import { AccountGetOneByIdUseCase, AccountUpdateConfigsUseCase } from '../../../Application'
import { ServiceFactory } from '../ServiceFactory'

export class AccountUseCaseFactory {
  constructor(private serviceFactory: ServiceFactory, private accountId?: string) {}

  private getRequiredAccountId(): string {
    const accountId = this.accountId
    if (!accountId) throw new InvalidUserAuthenticationData('Account id is missing')

    return accountId
  }

  public buildGetOneById(): AccountGetOneByIdUseCase {
    return new AccountGetOneByIdUseCase(
      this.getRequiredAccountId(),
      this.serviceFactory.buildDomain().buildAccountService()
    )
  }

  public buildUpdateConfigs(): AccountUpdateConfigsUseCase {
    return new AccountUpdateConfigsUseCase(
      this.getRequiredAccountId(),
      this.serviceFactory.buildDomain().buildAccountService()
    )
  }
}
