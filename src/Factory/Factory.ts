import { ApplicationContext } from '#framework'
import { RepositoryFactory } from './RepositoryFactory'
import { DataMapperFactory } from './DataMapperFactory'
import { UseCaseFactory } from './UseCaseFactory'
import { ServiceFactory } from './ServiceFactory'
import { EventProducerFactory } from './EventProducerFactory'
import { Queue } from '../Adapter/Event/queue'

export class Factory {
  private static instance: Factory
  private context: ApplicationContext

  private constructor() {
    this.context = new ApplicationContext()
  }

  public static getInstance(): Factory {
    if (!Factory.instance) Factory.instance = new Factory()

    return Factory.instance
  }

  public setContext(context: ApplicationContext): this {
    this.context = context
    return this
  }

  public buildRepositoryFactory(): RepositoryFactory {
    return new RepositoryFactory(this.context, this.buildDataMapperFactory())
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
      this.context,
      this.buildServiceFactory(),
      this.buildEventProducerFactory()
    )
  }
}
