import { ApplicationContext } from '#framework'
import { AccountGetOneByIdUseCase, AccountUpdateConfigsUseCase } from '#application'
import { ServiceFactory } from '../ServiceFactory'
import { BaseUseCaseFactory } from './BaseUseCaseFactory'

export class AccountUseCaseFactory extends BaseUseCaseFactory {
  constructor(
    protected readonly context: ApplicationContext,
    private readonly serviceFactory: ServiceFactory
  ) {
    super(context)
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
