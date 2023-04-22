import { IInstanceStatusResponseDto } from '../../Entity'
import { InstanceProvider } from '../../Provider'

export class InstanceStatusUseCase {
  constructor(private readonly instanceProvider: InstanceProvider) {}

  public async execute(): Promise<IInstanceStatusResponseDto> {
    try {
      const { connected } = (await this.instanceProvider.getStatus()).getBody()

      const { phone, imgUrl } = (await this.instanceProvider.getDevice()).getBody()

      return {
        connected,
        imageUrl: imgUrl,
        number: phone
      }
    } catch {
      return {
        connected: false,
        imageUrl: null,
        number: null
      }
    }
  }
}
