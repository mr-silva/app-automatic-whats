import { TaskItemProcessUseCase } from '#application'
import { ServiceFactory } from '../ServiceFactory'

export class TaskItemUseCaseFactory {
  constructor(private readonly serviceFactory: ServiceFactory) {}

  public buildProcessUseCase(): TaskItemProcessUseCase {
    return new TaskItemProcessUseCase(
      this.serviceFactory.buildDomain().buildAccountService(),
      this.serviceFactory.buildDomain().buildTaskService(),
      this.serviceFactory.buildApplication().buildZApiService()
    )
  }
}
