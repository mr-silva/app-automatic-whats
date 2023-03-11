import { Account } from '../../../../Domain'
import { AccountService } from '../../../../Domain/Service'

export class AccountGetOneByIdUseCase {
  constructor(
    private readonly accountId: string,
    private readonly accountService: AccountService
  ) {}

  public async execute(): Promise<Account> {
    return this.accountService.getOneById(this.accountId)
  }
}
