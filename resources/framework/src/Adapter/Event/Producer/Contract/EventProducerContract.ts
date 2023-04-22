import { Queue } from 'bullmq'
import { IConsumerMessage } from '../../Consumer/Interface'

export abstract class EventProducerContract {
  constructor(private queue: Queue) {}

  public async notify(messageIdentifier: string, messagePayload?: IConsumerMessage): Promise<void> {
    await this.queue.add(messageIdentifier, messagePayload)
  }
}
