import { InstanceProvider } from '../../Provider'

export class InstanceDisconnectUseCase {
  constructor(private readonly instanceProvider: InstanceProvider) {}

  public async execute(): Promise<void> {
    await this.instanceProvider.disconnect()
  }
}
