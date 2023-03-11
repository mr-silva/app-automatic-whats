import { Queue as BullMqQueue } from 'bullmq'

export class Queue {
  static instance: BullMqQueue

  public init() {
    if (Queue.instance) return

    Queue.instance = new BullMqQueue('automatic-whats', {
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379
      },
      defaultJobOptions: {
        attempts: 3,
        removeOnFail: true,
        removeOnComplete: true
      }
    })
  }

  static getInstance() {
    return Queue.instance
  }
}
