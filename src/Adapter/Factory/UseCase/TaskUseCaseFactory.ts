import { TaskCreateUseCase, TaskProcessUseCase } from '../../../Application'
import { EventProducerFactory } from '../EventProducerFactory'
import { ServiceFactory } from '../ServiceFactory'
import { BaseUseCaseFactory } from './BaseUseCaseFactory'

export class TaskUseCaseFactory extends BaseUseCaseFactory {
  constructor(
    protected readonly accountId: string | undefined,
    private readonly serviceFactory: ServiceFactory,
    private readonly eventProducerFactory: EventProducerFactory
  ) {
    super(accountId)
  }

  public buildCreateUseCase(): TaskCreateUseCase {
    return new TaskCreateUseCase(
      this.getRequiredAccountId(),
      this.serviceFactory.buildDomain().buildAccountService(),
      this.serviceFactory.buildDomain().buildTaskService(),
      this.eventProducerFactory.buildTaskEventProducer()
    )
  }

  public buildProcessUseCase(): TaskProcessUseCase {
    return new TaskProcessUseCase(
      this.serviceFactory.buildDomain().buildTaskService(),
      this.eventProducerFactory.buildTaskItemEventProducer()
    )
  }
}
