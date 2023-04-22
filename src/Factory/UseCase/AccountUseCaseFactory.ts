import { ApplicationContext } from '#framework'
import {
  AccountAuthenticateUseCase,
  AccountGetOneByIdUseCase,
  AccountUpdateConfigsUseCase,
  AccountWhatsConnectionStatusUseCase,
  AccountWhatsDisconnectUseCase
} from '#application'
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

  public buildAuthenticate(): AccountAuthenticateUseCase {
    return new AccountAuthenticateUseCase(this.serviceFactory.buildDomain().buildAccountService())
  }

  public buildWhatsConnectionStatus(): AccountWhatsConnectionStatusUseCase {
    return new AccountWhatsConnectionStatusUseCase(
      this.getRequiredAccountId(),
      this.serviceFactory.buildDomain().buildAccountService(),
      this.serviceFactory.buildApplication().buildZApiService()
    )
  }

  public buildWhatsDisconnect(): AccountWhatsDisconnectUseCase {
    return new AccountWhatsDisconnectUseCase(
      this.getRequiredAccountId(),
      this.serviceFactory.buildDomain().buildAccountService(),
      this.serviceFactory.buildApplication().buildZApiService()
    )
  }
}
