import { IConsumerMessage } from '../../../../framework'
import { Factory } from '../../Factory'

export class TaskEventConsumer {
  private readonly factory: Factory

  constructor(private message: IConsumerMessage) {
    this.factory = new Factory()
  }

  public async taskCreated(): Promise<void> {
    this.factory
      .buildUseCaseFactory()
      .buildTask()
      .buildProcessUseCase()
      .execute(this.message.payload)
  }
}
