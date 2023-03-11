import { DataMapperFactory } from './DataMapperFactory'
import { DataNotFound } from '../../../framework'
import { AccountRepository, MongooseMongoDBDatabase, TaskRepository } from '../../Adapter/ORM'

export class RepositoryFactory {
  constructor(private readonly dataMapperFactory: DataMapperFactory) {}

  public buildTaskRepository() {
    return new TaskRepository(
      MongooseMongoDBDatabase.getConnection(),
      this.dataMapperFactory.buildTaskDataMapperMediator(),
      new DataNotFound()
    )
  }

  public buildAccountRepository() {
    return new AccountRepository(
      MongooseMongoDBDatabase.getConnection(),
      this.dataMapperFactory.buildAccountDataMapper(),
      new DataNotFound()
    )
  }
}
