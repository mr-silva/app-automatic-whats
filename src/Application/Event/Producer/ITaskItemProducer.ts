import { IConsumerMessage } from '#framework'
import { ITaskItemProcessPayloadDto } from '../../UseCase'

export interface ITaskItemProducer {
  processItem(message: IConsumerMessage<ITaskItemProcessPayloadDto>): Promise<void>
}
