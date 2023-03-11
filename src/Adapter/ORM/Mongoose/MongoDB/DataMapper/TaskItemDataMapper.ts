import { EntityDataMapperContract } from '../../../../../../framework'
import { TaskItem } from '../../../../../Domain'
import { TaskItemEntity } from '../Entity'

export class TaskItemDataMapper extends EntityDataMapperContract<TaskItem, TaskItemEntity> {
  toDomain(entity: TaskItemEntity): TaskItem {
    return new TaskItem(entity.row, entity.status, entity.rawData, entity.note, entity.id)
  }

  toDaoEntity(domain: TaskItem): TaskItemEntity {
    return new TaskItemEntity(
      domain.getId(),
      domain.getRow(),
      domain.getStatus(),
      domain.getRawData(),
      domain.getNote()
    )
  }
}
