import { IZApiAppService } from '../../../Application'
import { ITaskItemRawDataInterface } from '../../../Domain'
import { ProviderFactory } from './Factory'
import { SendMessageUseCase } from './UseCase'

export class ZApiService implements IZApiAppService {
  private providerFactory: ProviderFactory | undefined

  public getProviderFactory(): ProviderFactory {
    if (!this.providerFactory) this.providerFactory = new ProviderFactory()

    return this.providerFactory
  }

  public setProfileData(instance: string, token: string): this {
    this.getProviderFactory().setInstance(instance).setToken(token)

    return this
  }

  public async sendMessage(
    campaignMessage: string,
    contactPayload: ITaskItemRawDataInterface
  ): Promise<void> {
    const sendMessageUseCase = new SendMessageUseCase(
      this.getProviderFactory().buildMessageProvider()
    )

    await sendMessageUseCase.execute(campaignMessage, contactPayload)
  }
}
