import { EventProducerFactory } from './EventProducerFactory'
import { ServiceFactory } from './ServiceFactory'
import { AccountUseCaseFactory, TaskItemUseCaseFactory, TaskUseCaseFactory } from './UseCase'

export class UseCaseFactory {
  constructor(
    private readonly serviceFactory: ServiceFactory,
    private readonly eventProducerFactory: EventProducerFactory,
    private readonly accountId?: string
  ) {}

  public buildTask(): TaskUseCaseFactory {
    return new TaskUseCaseFactory(this.serviceFactory, this.eventProducerFactory)
  }

  public buildTaskItem(): TaskItemUseCaseFactory {
    return new TaskItemUseCaseFactory(this.serviceFactory)
  }

  public buildAccount(): AccountUseCaseFactory {
    return new AccountUseCaseFactory(this.serviceFactory, this.accountId)
  }
}
