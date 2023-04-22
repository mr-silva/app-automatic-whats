import { RepositoryFactory } from './RepositoryFactory'
import { ApplicationServiceFactory, DomainServiceFactory } from './Service'

export class ServiceFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory) {}

  public buildDomain(): DomainServiceFactory {
    return new DomainServiceFactory(this.repositoryFactory)
  }

  public buildApplication(): ApplicationServiceFactory {
    return new ApplicationServiceFactory()
  }
}
