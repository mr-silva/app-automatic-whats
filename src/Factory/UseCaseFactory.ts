import { ApplicationContext } from '#framework'
import { EventProducerFactory } from './EventProducerFactory'
import { ServiceFactory } from './ServiceFactory'
import { AccountUseCaseFactory, TaskItemUseCaseFactory, TaskUseCaseFactory } from './UseCase'

export class UseCaseFactory {
  constructor(
    private readonly context: ApplicationContext,
    private readonly serviceFactory: ServiceFactory,
    private readonly eventProducerFactory: EventProducerFactory
  ) {}

  public buildTask(): TaskUseCaseFactory {
    return new TaskUseCaseFactory(this.context, this.serviceFactory, this.eventProducerFactory)
  }

  public buildTaskItem(): TaskItemUseCaseFactory {
    return new TaskItemUseCaseFactory(this.serviceFactory)
  }

  public buildAccount(): AccountUseCaseFactory {
    return new AccountUseCaseFactory(this.context, this.serviceFactory)
  }
}
