import { RepositoryFactory } from './RepositoryFactory'
import { DataMapperFactory } from './DataMapperFactory'
import { UseCaseFactory } from './UseCaseFactory'
import { ServiceFactory } from './ServiceFactory'
import { EventProducerFactory } from './EventProducerFactory'
import { Queue } from '../../Adapter/Event/queue'

export class Factory {
  constructor(private readonly accountId?: string) {}

  public buildRepositoryFactory(): RepositoryFactory {
    return new RepositoryFactory(this.buildDataMapperFactory())
  }

  public buildDataMapperFactory(): DataMapperFactory {
    return new DataMapperFactory()
  }

  public buildServiceFactory(): ServiceFactory {
    return new ServiceFactory(this.buildRepositoryFactory())
  }

  public buildEventProducerFactory(): EventProducerFactory {
    return new EventProducerFactory(Queue.getInstance())
  }

  public buildUseCaseFactory(): UseCaseFactory {
    return new UseCaseFactory(
      this.buildServiceFactory(),
      this.buildEventProducerFactory(),
      this.accountId
    )
  }
}
