import { ITaskItemRawDataInterface } from '../../../../Domain'

export interface ITaskCreatePayloadDto {
  items: {
    row: number
    rawData: ITaskItemRawDataInterface
  }[]
  message: string
  processItemInterval?: number
}
