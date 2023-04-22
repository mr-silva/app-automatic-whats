import { Job, Worker } from 'bullmq'
import { IConsumer } from './Interface'

export class EventConsumer {
  constructor(private queueIdentifier: string, private host: string, private port: number) {}

  public async start(consumers: IConsumer[]): Promise<void> {
    new Worker(
      this.queueIdentifier,
      async (job: Job) => {
        for (const consumer of consumers) {
          if (Object.keys(consumer.actions).includes(job.name)) {
            const method = consumer.actions[job.name]

            await method(job.data)
          }
        }
      },
      {
        connection: {
          host: this.host,
          port: this.port
        }
      }
    )

    console.info(`Worker of queue [${this.queueIdentifier}] is running`)
  }
}
