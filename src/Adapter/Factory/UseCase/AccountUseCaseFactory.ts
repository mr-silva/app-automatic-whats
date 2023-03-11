import { AccountGetOneByIdUseCase, AccountUpdateConfigsUseCase } from '../../../Application'
import { ServiceFactory } from '../ServiceFactory'
import { BaseUseCaseFactory } from './BaseUseCaseFactory'

export class AccountUseCaseFactory extends BaseUseCaseFactory {
  constructor(
    protected readonly accountId: string | undefined,
    private readonly serviceFactory: ServiceFactory
  ) {
    super(accountId)
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
