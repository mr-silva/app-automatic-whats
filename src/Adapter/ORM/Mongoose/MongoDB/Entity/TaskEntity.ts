import { TaskStatusEnum } from '../../../../../Domain'
import { TaskSettings } from '../ValueObject'
import { TaskItemEntity } from './TaskItemEntity'

export class TaskEntity {
  public items: TaskItemEntity[] = []

  constructor(public id: string, public status: TaskStatusEnum, public settings: TaskSettings) {}

  public addItem(item: TaskItemEntity): this {
    this.items.push(item)
    return this
  }
}
