export interface IServiceStockResponseDto {
  messages: IStock[]
}

export interface IStock {
  body: {
    availableQuantity: number
    sku: string
    skuId: string
  }
  receiptId: string
  messageId: string
}
