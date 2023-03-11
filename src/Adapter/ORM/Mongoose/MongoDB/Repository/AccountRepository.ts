import {
  DataNotFound,
  IEntityDataMapper,
  MongooseMongoDBRepositoryContract
} from '../../../../../../framework'
import { Connection } from 'mongoose'
import { Account, IAccountRepository } from '../../../../../Domain'
import { AccountEntity } from '../Entity'
import { AccountSchema } from '../Schema'

export class AccountRepository
  extends MongooseMongoDBRepositoryContract<Account, AccountEntity>
  implements IAccountRepository
{
  constructor(
    mongoDBConnection: Connection,
    dataMapper: IEntityDataMapper<Account, AccountEntity>,
    dataNotFoundException: DataNotFound
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

  protected hasAccountIdColumn(): boolean {
    return false
  }
}
