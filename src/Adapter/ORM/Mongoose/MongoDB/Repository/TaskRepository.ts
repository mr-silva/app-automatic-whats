import { Connection } from 'mongoose'
import {
  DataNotFoundException,
  IEntityDataMapper,
  MongooseMongoDBRepositoryContract
} from '#framework'
import { ITaskRepository, Task } from '#domain'
import { TaskEntity } from '../Entity'
import { TaskSchema } from '../Schema'

export class TaskRepository
  extends MongooseMongoDBRepositoryContract<Task, TaskEntity>
  implements ITaskRepository
{
  constructor(
    mongoDBConnection: Connection,
    dataMapper: IEntityDataMapper<Task, TaskEntity>,
    dataNotFoundException: DataNotFoundException,
    accountId: string | undefined
  ) {
    super(
      mongoDBConnection.model<TaskEntity>('TaskEntity', TaskSchema),
      dataMapper,
      dataNotFoundException,
      accountId
    )
  }

  public async save(entity: Task): Promise<Task> {
    await this.model.updateOne(
      { id: entity.getId(), accountId: this.accountId },
      { $set: this.dataMapper.toDaoEntity(entity) },
      { upsert: true }
    )

    return this.getOneById(entity.getId())
  }

  protected hasAccountIdColumn(): boolean {
    return true
  }
}
