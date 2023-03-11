import './queue'
import * as dotenv from 'dotenv'
import { EventConsumer, IConsumer, IConsumerMessage } from '../../framework'
import { MongooseMongoDBDatabase } from '../Adapter/ORM/Mongoose/MongoDB'
import { ITaskItemProcessPayloadDto, ITaskProcessPayloadDto } from './UseCase'
import { TaskEventConsumer, TaskItemEventConsumer } from '../Adapter/Event'
;(async () => {
  dotenv.config()

  const consumers: IConsumer[] = [
    {
      eventConsumer: 'task',
      actions: {
        taskCreated: (message: IConsumerMessage<ITaskProcessPayloadDto>) =>
          new TaskEventConsumer(message).taskCreated()
      }
    },
    {
      eventConsumer: 'taskItem',
      actions: {
        processItem: (message: IConsumerMessage<ITaskItemProcessPayloadDto>) =>
          new TaskItemEventConsumer(message).processItem()
      }
    }
  ]

  const mongoDatabase = new MongooseMongoDBDatabase()

  try {
    await mongoDatabase.validate()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  await new EventConsumer(
    'automatic-whats',
    process.env.REDIS_HOST!,
    Number(process.env.REDIS_PORT!)
  ).start(consumers)
})()
