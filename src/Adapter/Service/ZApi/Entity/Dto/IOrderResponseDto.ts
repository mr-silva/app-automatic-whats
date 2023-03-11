import { IOrderCreateRequestDto } from './IOrderCreateRequestDto'

export interface IServiceOrderResponseDto {
  messages: IOrder[]
}

export interface IOrder {
  body: IOrderCreateRequestDto
  receiptId: string
  messageId: string
}
