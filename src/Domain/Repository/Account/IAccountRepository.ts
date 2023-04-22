import { IRepository } from '#framework'
import { Account } from '../../Entity'

export interface IAccountRepository extends IRepository<Account> {
  getOneByEmailAndPassword(email: string, password: string): Promise<Account>
}
