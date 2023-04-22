import { IConsumerMessage } from '#framework'
import { ITaskProcessPayloadDto } from '../../UseCase'

export interface ITaskProducer {
  taskCreated(message: IConsumerMessage<ITaskProcessPayloadDto>): Promise<void>
}
