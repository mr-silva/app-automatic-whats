import { Account } from '../../Entity'
import { IAccountRepository } from '../../Repository'

export class AccountService {
  constructor(private readonly accountRepository: IAccountRepository) {}

  public async getOneById(id: string): Promise<Account> {
    return this.accountRepository.getOneById(id)
  }

  public async save(account: Account): Promise<Account> {
    return this.accountRepository.save(account)
  }

  public async getOneByEmailAndPassword(email: string, password: string): Promise<Account> {
    return this.accountRepository.getOneByEmailAndPassword(email, password)
  }
}
