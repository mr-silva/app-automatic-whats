import {
  DataNotFound,
  IEntityDataMapper,
  MongooseMongoDBRepositoryContract
} from '../../../../../../framework'
import { Connection } from 'mongoose'
import { ITaskRepository, Task } from '../../../../../Domain'
import { TaskEntity } from '../Entity'
import { TaskSchema } from '../Schema'

export class TaskRepository
  extends MongooseMongoDBRepositoryContract<Task, TaskEntity>
  implements ITaskRepository
{
  constructor(
    mongoDBConnection: Connection,
    dataMapper: IEntityDataMapper<Task, TaskEntity>,
    dataNotFoundException: DataNotFound
  ) {
    super(
      mongoDBConnection.model<TaskEntity>('TaskEntity', TaskSchema),
      dataMapper,
      dataNotFoundException
    )
  }

  public async save(entity: Task): Promise<Task> {
    await this.model.updateOne(
      { id: entity.getId() },
      { $set: this.dataMapper.toDaoEntity(entity) },
      { upsert: true }
    )

    return this.getOneById(entity.getId())
  }

  protected hasAccountIdColumn(): boolean {
    return false
  }
}
