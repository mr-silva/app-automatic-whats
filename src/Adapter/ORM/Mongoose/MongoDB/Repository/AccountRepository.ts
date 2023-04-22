import crypto from 'crypto'
import { Connection } from 'mongoose'
import {
  DataNotFoundException,
  IEntityDataMapper,
  MongooseMongoDBRepositoryContract
} from '#framework'
import { Account, IAccountRepository } from '#domain'
import { AccountEntity } from '../Entity'
import { AccountSchema } from '../Schema'

export class AccountRepository
  extends MongooseMongoDBRepositoryContract<Account, AccountEntity>
  implements IAccountRepository
{
  constructor(
    mongoDBConnection: Connection,
    dataMapper: IEntityDataMapper<Account, AccountEntity>,
    dataNotFoundException: DataNotFoundException
  ) {
    super(
      mongoDBConnection.model<AccountEntity>('AccountEntity', AccountSchema),
      dataMapper,
      dataNotFoundException
    )
  }

  public async save(entity: Account): Promise<Account> {
    await this.model.updateOne(
      { id: entity.getId() },
      { $set: this.dataMapper.toDaoEntity(entity) },
      { upsert: true }
    )

    return this.getOneById(entity.getId())
  }

  public async getOneByEmailAndPassword(email: string, password: string): Promise<Account> {
    const sha256 = (str: string) => crypto.createHash('sha256').update(str).digest('hex')
    const encodedPassword = sha256(sha256(password))

    const result = await this.model.findOne({
      email,
      password: encodedPassword
    })

    if (!result) throw this.dataNotFoundException

    return this.dataMapper.toDomain(result)
  }

  protected hasAccountIdColumn(): boolean {
    return false
  }
}
