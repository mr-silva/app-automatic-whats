import { AccountService, TaskService } from '../../../Domain'
import { RepositoryFactory } from '../RepositoryFactory'

export class DomainServiceFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory) {}

  public buildAccountService(): AccountService {
    return new AccountService(this.repositoryFactory.buildAccountRepository())
  }

  public buildTaskService(): TaskService {
    return new TaskService(this.repositoryFactory.buildTaskRepository())
  }
}
