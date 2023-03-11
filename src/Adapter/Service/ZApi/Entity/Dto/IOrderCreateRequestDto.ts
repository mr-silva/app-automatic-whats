import {
  ErpCustomerGenderEnum,
  ErpCustomerTypeEnum,
  ErpFulfillmentStatusEnum,
  ErpInvoiceTypeEnum,
  ErpOrderChannelTypeEnum,
  ErpOrderPaymentStatusEnum,
  ErpOrderStatusEnum,
  ErpPaymentStatusEnum,
  ErpPaymentTypeEnum,
  ErpShipmentTypeEnum
} from '../Enum'
import { ErpFulfillmentTypeEnum } from '../Enum/ErpFulfillmentTypeEnum'

export interface IOrderCreateRequestDto {
  billingAddress: IErpAddress
  brandId: string
  channelType: ErpOrderChannelTypeEnum
  companyId: string
  customer: {
    acceptsMarketing: boolean
    createdAt: Date
    customerId: string
    dateOfBirth: string
    documentNumber:
      | {
          cnpj: string
          ie?: string
        }
      | {
          cpf: string
          rg?: string
        }
    email: string
    firstName: string
    gender?: ErpCustomerGenderEnum
    lastName?: string
    mobilePhone?: string
    phone?: string
    type: ErpCustomerTypeEnum
    updatedAt: Date
  }
  details?: {
    marketplace?: {
      group: string
      name: string
      referenceOrderId: string
    }
  }
  discount: number
  fulfillments: {
    cancelReason?: string
    deliveredAt?: Date
    fulfillmentId: string
    items: {
      name: string
      quantity: number
      skuId: string
    }[]
    invoices?: {
      createdAt: Date
      issuedAt: Date
      nfe: {
        authorizationProtocol?: string
        cfop?: string
        eletronicKey: string
        invoicePdf?: string
        invoiceXml?: string
        invoiceXmlContent?: string
        observation?: string
        operation?: string
        serialNumber: string
      }
      number: string
      processedAt: Date
      type: ErpInvoiceTypeEnum
    }[]
    locationId: string
    status: ErpFulfillmentStatusEnum
    type: ErpFulfillmentTypeEnum
    shipment?: {
      address: IErpAddress
      amount: number
      carrier?: string
      daysToDelivery: number
      deliveryDate: Date
      method: string
      type: ErpShipmentTypeEnum
      trackingCode?: string
      trackingUrl?: string
    }
    pickup?: {
      amount: number
      daysToPickup: number
    }
  }[]
  items: {
    discount: number
    giftPackage: boolean
    giftProduct: boolean
    price: number
    quantity: number
    sku: {
      height: {
        unit: 'cm'
        value: number
      }
      length: {
        unit: 'cm'
        value: number
      }
      sku: string
      skuId: string
      title?: string
      weight: {
        unit: 'kg'
        value: number
      }
      width: {
        unit: 'cm'
        value: number
      }
    }
    subTotal: number
  }[]
  orderId: string
  paymentStatus: ErpOrderPaymentStatusEnum
  payments: {
    balance: {
      canceled: {
        amount: number
        applicationId: string
        date: Date
      } | null
      due: {
        amount: number
        applicationId: string
      }
      paid: {
        amount: number
        applicationId: string
        date: Date
      } | null
    }
    details: IErpPaymentDetails
    paymentId: string
    status: ErpPaymentStatusEnum
  }[]
  placedAt: Date
  pointOfSaleId: string
  status: ErpOrderStatusEnum
  total: number
}

export enum OmsOrderPaymentTypeToErpPaymentTypeEnum {
  MANUAL = 'CASH',
  CREDITCARD = 'CREDITCARD',
  BANKSLIP = 'SLIP',
  CHECKOUT = 'CASH',
  PIX = 'PIX'
}

interface IErpAddress {
  addressId: string
  addressLine1: string
  addressLine2?: string
  addressName?: string
  city: string
  contactName?: string
  contactPhone?: string
  country?: string
  default: boolean
  neighbourhood: string
  number: string
  state: string
  zipCode: string
}

interface IErpPaymentDetails {
  cash?: {
    capturedDate: Date
  }
  creditCard?: {
    capturedDate: Date
    installmentAmount: number
    installments: number
  }
  pix?: {
    installmentAmount: number
    installments: number
  }
  slip?: {
    expirationDate: Date
  }
  type: ErpPaymentTypeEnum
}
