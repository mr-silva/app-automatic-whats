import { ITaskItemRawDataInterface, TaskTypeEnum } from '#domain'

export interface ITaskCreatePayloadDto {
  items: {
    row: number
    rawData: ITaskItemRawDataInterface
  }[]
  message: string
  type: TaskTypeEnum
  processItemInterval?: number
  saveCampaign?: boolean
}
