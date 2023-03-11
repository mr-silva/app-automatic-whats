import { IConsumerMessage } from '../../../../framework'
import { Factory } from '../../Factory'

export class TaskItemEventConsumer {
  private readonly factory: Factory

  constructor(private message: IConsumerMessage) {
    this.factory = new Factory()
  }

  public async processItem(): Promise<void> {
    this.factory
      .buildUseCaseFactory()
      .buildTaskItem()
      .buildProcessUseCase()
      .execute(this.message.payload)
  }
}
