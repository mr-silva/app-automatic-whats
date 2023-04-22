import { IConsumerMessage } from '#framework'
import { Factory } from '#factory'

export class TaskEventConsumer {
  private readonly factory: Factory

  constructor(private message: IConsumerMessage) {
    this.factory = Factory.getInstance()
  }

  public async taskCreated(): Promise<void> {
    this.factory
      .buildUseCaseFactory()
      .buildTask()
      .buildProcessUseCase()
      .execute(this.message.payload)
  }
}
