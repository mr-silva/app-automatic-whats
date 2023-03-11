import { TaskItemStatusEnum } from '../Enum'
import { ITaskItemRawDataInterface } from '../Interface'
import { Base } from './Base'

export class TaskItem extends Base {
  constructor(
    private row: number,
    private status: TaskItemStatusEnum,
    private rawData?: ITaskItemRawDataInterface,
    private note?: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt)
  }

  public setRawData(rawData: ITaskItemRawDataInterface): this {
    this.rawData = rawData
    return this
  }

  public setStatus(status: TaskItemStatusEnum): this {
    this.status = status
    return this
  }

  public setNote(note: string): this {
    this.note = note
    return this
  }

  public getRow(): number {
    return this.row
  }

  public getStatus(): TaskItemStatusEnum {
    return this.status
  }

  public getNote(): string | undefined {
    return this.note
  }

  public getRawData(): ITaskItemRawDataInterface | undefined {
    return this.rawData
  }
}
