import {
  AccountService,
  AccountWithoutZApiInstanceOrTokenException,
  WhatsConnectionStatusEnum,
  WhatsStatus
} from '#domain'
import { IZApiAppService } from '../../../Service'

export class AccountWhatsConnectionStatusUseCase {
  constructor(
    private readonly accountId: string,
    private readonly accountService: AccountService,
    private readonly zApiService: IZApiAppService
  ) {}

  public async execute(): Promise<WhatsStatus> {
    const account = await this.accountService.getOneById(this.accountId)

    if (!account.getConfigs().getZApiInstance() || !account.getConfigs().getZApiToken())
      throw new AccountWithoutZApiInstanceOrTokenException()

    const { connected, number, imageUrl } = await this.zApiService
      .setProfileData(account.getConfigs().getZApiInstance()!, account.getConfigs().getZApiToken()!)
      .getStatus()

    return new WhatsStatus(
      connected ? WhatsConnectionStatusEnum.CONNECTED : WhatsConnectionStatusEnum.DISCONNECTED,
      number,
      imageUrl
    )
  }
}
