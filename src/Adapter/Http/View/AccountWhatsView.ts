import { ViewContract } from '#framework'
import { WhatsConnectionStatusEnum, WhatsStatus } from '#domain'

export class AccountWhatsView extends ViewContract<WhatsStatus, IAccountWhatsView> {
  render(entity: WhatsStatus): IAccountWhatsView {
    return {
      status: entity.getStatus(),
      phoneNumber: entity.getNumber(),
      profileImageUrl: entity.getImageUrl(),
      connectionQRCode: entity.getQRCode()
    }
  }
}

interface IAccountWhatsView {
  status: WhatsConnectionStatusEnum
  phoneNumber: string | null
  profileImageUrl: string | null
  connectionQRCode: string | null
}
