export interface IConsumerMessage<MessagePayload extends any = any> {
  payload: MessagePayload
}
