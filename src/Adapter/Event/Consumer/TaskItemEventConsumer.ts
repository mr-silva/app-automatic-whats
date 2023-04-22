import { IConsumerMessage } from '#framework'
import { Factory } from '#factory'

export class TaskItemEventConsumer {
  private readonly factory: Factory

  constructor(private message: IConsumerMessage) {
    this.factory = Factory.getInstance()
  }

  public async processItem(): Promise<void> {
    this.factory
      .buildUseCaseFactory()
      .buildTaskItem()
      .buildProcessUseCase()
      .execute(this.message.payload)
  }
}
