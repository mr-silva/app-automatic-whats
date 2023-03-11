import { TaskCreateUseCase, TaskProcessUseCase } from '../../../Application'
import { EventProducerFactory } from '../EventProducerFactory'
import { ServiceFactory } from '../ServiceFactory'

export class TaskUseCaseFactory {
  constructor(
    private readonly serviceFactory: ServiceFactory,
    private readonly eventProducerFactory: EventProducerFactory
  ) {}

  public buildCreateUseCase(): TaskCreateUseCase {
    return new TaskCreateUseCase(
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
