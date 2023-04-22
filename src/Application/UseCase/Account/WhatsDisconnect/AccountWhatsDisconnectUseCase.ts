import { AccountService, AccountWithoutZApiInstanceOrTokenException } from '#domain'
import { IZApiAppService } from '../../../Service'

export class AccountWhatsDisconnectUseCase {
  constructor(
    private readonly accountId: string,
    private readonly accountService: AccountService,
    private readonly zApiService: IZApiAppService
  ) {}

  public async execute(): Promise<void> {
    const account = await this.accountService.getOneById(this.accountId)

    if (!account.getConfigs().getZApiInstance() || !account.getConfigs().getZApiToken())
      throw new AccountWithoutZApiInstanceOrTokenException()

    await this.zApiService
      .setProfileData(account.getConfigs().getZApiInstance()!, account.getConfigs().getZApiToken()!)
      .disconnect()
  }
}
