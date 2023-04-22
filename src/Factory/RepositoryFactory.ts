import { DataMapperFactory } from './DataMapperFactory'
import { ApplicationContext, DataNotFoundException } from '#framework'
import { AccountRepository, MongooseMongoDBDatabase, TaskRepository } from '../Adapter/ORM'

export class RepositoryFactory {
  constructor(
    private readonly context: ApplicationContext,
    private readonly dataMapperFactory: DataMapperFactory
  ) {}

  public buildTaskRepository() {
    return new TaskRepository(
      MongooseMongoDBDatabase.getConnection(),
      this.dataMapperFactory.buildTaskDataMapperMediator(),
      new DataNotFoundException(),
      this.context.getAccountId()
    )
  }

  public buildAccountRepository() {
    return new AccountRepository(
      MongooseMongoDBDatabase.getConnection(),
      this.dataMapperFactory.buildAccountDataMapper(),
      new DataNotFoundException()
    )
  }
}
