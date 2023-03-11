import { TaskStatusEnum, TaskTypeEnum } from '../Enum'
import { TaskSettings } from '../ValueObject'
import { Base } from './Base'
import { TaskItem } from './TaskItem'

export class Task extends Base {
  private items: TaskItem[]

  constructor(
    private accountId: string,
    private status: TaskStatusEnum,
    private settings: TaskSettings,
    private type: TaskTypeEnum,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt)

    this.items = []
  }

  public addItem(taskItem: TaskItem): this {
    this.items.push(taskItem)
    return this
  }

  public setItems(taskItems: TaskItem[]): this {
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

  public getItems(): TaskItem[] {
    return this.items || []
  }

  public getSettings(): TaskSettings {
    return this.settings
  }

  public getAccountId(): string {
    return this.accountId
  }

  public getType(): TaskTypeEnum {
    return this.type
  }
}
