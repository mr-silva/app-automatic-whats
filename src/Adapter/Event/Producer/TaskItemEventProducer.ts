import { EventProducerContract, IConsumerMessage } from '../../../../framework'
import { ITaskItemProcessPayloadDto, ITaskItemProducer } from '../../../Application'

export class TaskItemEventProducer extends EventProducerContract implements ITaskItemProducer {
  public async processItem(message: IConsumerMessage<ITaskItemProcessPayloadDto>): Promise<void> {
    return this.notify('processItem', message)
  }
}
