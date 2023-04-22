import { ApplicationContext } from '#framework'
import { TaskCreateUseCase, TaskProcessUseCase } from '#application'
import { EventProducerFactory } from '../EventProducerFactory'
import { ServiceFactory } from '../ServiceFactory'
import { BaseUseCaseFactory } from './BaseUseCaseFactory'

export class TaskUseCaseFactory extends BaseUseCaseFactory {
  constructor(
    protected readonly context: ApplicationContext,
    private readonly serviceFactory: ServiceFactory,
    private readonly eventProducerFactory: EventProducerFactory
  ) {
    super(context)
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
