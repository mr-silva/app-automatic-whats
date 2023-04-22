import { WhatsConnectionStatusEnum } from '../Enum'

export class WhatsStatus {
  constructor(
    private status: WhatsConnectionStatusEnum,
    private number: string | null,
    private imageUrl: string | null
  ) {}

  public getStatus(): WhatsConnectionStatusEnum {
    return this.status
  }

  public getNumber(): string | null {
    return this.number
  }

  public getImageUrl(): string | null {
    return this.imageUrl
  }
}
