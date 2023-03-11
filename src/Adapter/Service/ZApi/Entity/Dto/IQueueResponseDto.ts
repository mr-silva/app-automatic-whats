export interface IQueueResponseDto {
  queues: {
    queueId: string
    approximateNumberOfMessages: number
    topicId: string
    producerApplicationId: string
  }[]
}
