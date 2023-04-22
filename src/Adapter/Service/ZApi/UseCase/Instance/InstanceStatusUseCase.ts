import { IInstanceStatusResponseDto } from '../../Entity'
import { InstanceProvider } from '../../Provider'

export class InstanceStatusUseCase {
  constructor(private readonly instanceProvider: InstanceProvider) {}

  public async execute(): Promise<IInstanceStatusResponseDto> {
    const { connected } = (await this.instanceProvider.getStatus()).getBody()
    let qrCodeImage: string | null = null

    if (!connected) {
      const { value } = (await this.instanceProvider.getQRCodeImage()).getBody()

      qrCodeImage = value
    }
    try {
      const { phone, imgUrl } = (await this.instanceProvider.getDevice()).getBody()

      return {
        connected,
        imageUrl: imgUrl,
        number: phone,
        qrCodeImage
      }
    } catch (error) {
      return {
        connected,
        imageUrl: null,
        number: null,
        qrCodeImage
      }
    }
  }
}
