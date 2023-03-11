import { EntityDataMapperContract } from '../../../../../../framework'
import { Task, TaskSettings as DomainTaskSettings } from '../../../../../Domain'
import { TaskEntity } from '../Entity'
import { TaskSettings } from '../ValueObject'

export class TaskDataMapper extends EntityDataMapperContract<Task, TaskEntity> {
  toDomain(entity: TaskEntity): Task {
    return new Task(
      entity.accountId,
      entity.status,
      new DomainTaskSettings(entity.settings.message, entity.settings.processItemInterval),
      entity.type,
      entity.id
    )
  }

  toDaoEntity(domain: Task): TaskEntity {
    return new TaskEntity(
      domain.getId(),
      domain.getAccountId(),
      domain.getStatus(),
      new TaskSettings(
        domain.getSettings().getMessage(),
        domain.getSettings().getProcessItemInterval()
      ),
      domain.getType()
    )
  }
}
