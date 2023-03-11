import { Base } from './Base'
import { TaskItem } from './TaskItem'

export class Campaign extends Base {
  private taskItems: TaskItem[]

  constructor(private accountId: string, id?: string, createdAt?: Date, updatedAt?: Date) {
    super(id, createdAt, updatedAt)

    this.taskItems = []
  }

  public setTaskItems(taskItems: TaskItem[]): this {
    this.taskItems = taskItems
    return this
  }

  public getTaskItems(): TaskItem[] {
    return this.taskItems
  }

  public getAccountId(): string {
    return this.accountId
  }
}
