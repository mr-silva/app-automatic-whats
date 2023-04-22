import { Account, AccountService } from '#domain'
import { IAccountUpdateConfigsPayloadDto } from './IAccountUpdateConfigsPayloadDto'

export class AccountUpdateConfigsUseCase {
  constructor(
    private readonly accountId: string,
    private readonly accountService: AccountService
  ) {}

  public async execute(dto: IAccountUpdateConfigsPayloadDto): Promise<Account> {
    const account = await this.accountService.getOneById(this.accountId)

    if (dto.zApiInstance) account.getConfigs().setZApiInstance(dto.zApiInstance)
    if (dto.zApiToken) account.getConfigs().setZApiToken(dto.zApiToken)

    return this.accountService.save(account)
  }
}
