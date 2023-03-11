export interface IServicePriceResponseDto {
  messages: IPrice[]
}

export interface IPrice {
  body: {
    listPrice: number
    sku: string
    skuId: string
    salesPrice?: number
  }
  receiptId: string
  messageId: string
}
