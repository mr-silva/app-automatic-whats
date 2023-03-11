import { DataNotFound } from '../../../../framework'
import { Account } from '../../Entity'
import { IAccountRepository } from '../../Repository'
import { Configs } from '../../ValueObject'

export class AccountService {
  constructor(private readonly accountRepository: IAccountRepository) {}

  public async getOneById(id: string): Promise<Account> {
    try {
      return await this.accountRepository.getOneById(id)
    } catch (error) {
      if (!(error instanceof DataNotFound)) throw error

      return new Account(new Configs(), id)
    }
  }

  public async save(account: Account): Promise<Account> {
    return this.accountRepository.save(account)
  }
}
