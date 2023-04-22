import { EntityDataMapperContract } from '#framework'
import { Task } from '#domain'
import { TaskEntity } from '../../Entity'
import { TaskDataMapper } from '../TaskDataMapper'
import { TaskItemDataMapper } from '../TaskItemDataMapper'

export class TaskDataMapperMediator extends EntityDataMapperContract<Task, TaskEntity> {
  constructor(
    private readonly taskDataMapper: TaskDataMapper,
    private readonly taskItemDataMapper: TaskItemDataMapper
  ) {
    super()
  }

  toDomain(entity: TaskEntity): Task {
    const task = this.taskDataMapper.toDomain(entity)

    if (entity.items)
      this.taskItemDataMapper.toDomainMany(entity.items).forEach(item => task.addItem(item))

    return task
  }

  toDaoEntity(domain: Task): TaskEntity {
    const task = this.taskDataMapper.toDaoEntity(domain)

    if (domain.getItems()) {
      this.taskItemDataMapper.toDaoEntityMany(domain.getItems()).forEach(item => task.addItem(item))
    }

    return task
  }
}
