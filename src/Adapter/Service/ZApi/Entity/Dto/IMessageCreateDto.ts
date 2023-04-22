import { ITaskItemRawDataInterface } from '#domain'

export interface IMessageCreateDto extends ITaskItemRawDataInterface {
  nome: string
  numero: string
}
