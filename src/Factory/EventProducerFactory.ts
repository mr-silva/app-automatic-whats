import { Queue } from 'bullmq'
import { TaskEventProducer, TaskItemEventProducer } from '../Adapter/Event'

export class EventProducerFactory {
  constructor(private readonly queue: Queue) {}

  public buildTaskEventProducer() {
    return new TaskEventProducer(this.queue)
  }

  public buildTaskItemEventProducer() {
    return new TaskItemEventProducer(this.queue)
  }
}
