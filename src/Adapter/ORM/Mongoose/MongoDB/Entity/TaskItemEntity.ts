import { ITaskItemRawDataInterface, TaskItemStatusEnum } from '#domain'

export class TaskItemEntity {
  constructor(
    public id: string,
    public row: number,
    public status: TaskItemStatusEnum,
    public rawData?: ITaskItemRawDataInterface,
    public note?: string
  ) {}
}
