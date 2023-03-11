import { TaskStatusEnum } from '../Enum'
import { TaskSettings } from '../ValueObject'
import { Base } from './Base'
import { TaskItem } from './TaskItem'

export class Task extends Base {
  private items: TaskItem[] | undefined

  constructor(
    private status: TaskStatusEnum,
    private settings: TaskSettings,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt)
  }

  public addTaskItem(taskItem: TaskItem): this {
    if (!this.items) this.items = []
    this.items.push(taskItem)
    return this
  }

  public setTaskItems(taskItems: TaskItem[]): this {
    this.items = taskItems
    return this
  }

  public setStatus(status: TaskStatusEnum): this {
    this.status = status
    return this
  }

  public setSettings(settings: TaskSettings): this {
    this.settings = settings
    return this
  }

  public getStatus(): TaskStatusEnum {
    return this.status
  }

  public getTaskItems(): TaskItem[] {
    return this.items || []
  }

  public getSettings(): TaskSettings {
    return this.settings
  }
}
