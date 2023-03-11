import { IOrder } from './IOrderResponseDto'
import { IPrice } from './IPriceResponseDto'
import { IProduct } from './IProductResponseDto'
import { IStock } from './IStockResponseDto'

export interface IServiceResponseDto {
  messages: ITopic[]
}

export type ITopic = IProduct | IStock | IPrice | IOrder
