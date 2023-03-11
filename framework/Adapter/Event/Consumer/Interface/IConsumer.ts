import { IConsumerMessage } from './IConsumerMessage'

export interface IConsumer {
  eventConsumer: string
  actions: {
    [key: string]: (message: IConsumerMessage) => Promise<void>
  }
}
