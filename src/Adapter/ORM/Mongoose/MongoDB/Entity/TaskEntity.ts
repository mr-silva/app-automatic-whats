import { TaskStatusEnum, TaskTypeEnum } from '../../../../../Domain'
import { TaskSettings } from '../ValueObject'
import { TaskItemEntity } from './TaskItemEntity'

export class TaskEntity {
  public items: TaskItemEntity[] = []

  constructor(
    public id: string,
    public accountId: string,
    public status: TaskStatusEnum,
    public settings: TaskSettings,
    public type: TaskTypeEnum
  ) {}

  public addItem(item: TaskItemEntity): this {
    this.items.push(item)
    return this
  }
}
