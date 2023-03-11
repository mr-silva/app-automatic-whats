export interface IServiceProductResponseDto {
  messages: IProduct[]
}

export interface IProduct {
  receiptId: string
  attributes: {
    topicId: string
    targetApplicationId: string
    applicationId: string
    messageId: string
  }
  body: {
    createdAt: Date
    publishedAt: Date
    productId: string
    enabled: boolean
    category: {
      name: string
      id: string
    }
    warranty: string
    images: [
      {
        skuIds: string[]
        updatedAt: Date
        url: string
        id: string
        height: number
        width: number
      }
    ]
    brand: {
      name: string
      id: string
    }
    publishedScope: string
    updatedAt: Date
    skus: IProductVariation[]
    description: string
    variations?: {
      name: string
      id: ErpVariationTypeEnum
    }[]
    title: string
  }
  messageId: string
}

export enum ErpVariationTypeEnum {
  COLOR = 'COLOR',
  SIZE = 'SIZE',
  VOLTAGE = 'VOLTAGE',
  FLAVOR = 'FLAVOR',
  MATERIAL = 'MATERIAL'
}

export interface IProductVariation {
  sku: string
  length: {
    value: number
    unit: string
  }
  enabled: boolean
  variationOptions?: {
    name: string
    data: {
      value: string
      type: string
    }
    id: ErpVariationTypeEnum
  }[]
  identifiers: {
    defaultGtin: string
    gtins?: string[]
  }
  requiresShipping: boolean
  updatedAt: Date
  weight: {
    value: number
    unit: string
  }
  title: string
  skuId: string
  height: {
    value: number
    unit: string
  }
  width: {
    value: number
    unit: string
  }
  price?: number
  stock?: number
}
