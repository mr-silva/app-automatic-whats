import { EventProducerContract, IConsumerMessage } from '../../../../framework'
import { ITaskProcessPayloadDto, ITaskProducer } from '../../../Application'

export class TaskEventProducer extends EventProducerContract implements ITaskProducer {
  public async taskCreated(message: IConsumerMessage<ITaskProcessPayloadDto>): Promise<void> {
    return this.notify('taskCreated', message)
  }
}
