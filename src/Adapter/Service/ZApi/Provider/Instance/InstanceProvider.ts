import { HttpMethodEnum } from '#framework'
import { BaseProvider } from '../BaseProvider'
import { InstanceDeviceResponse, InstanceQRCodeResponse, InstanceStatusResponse } from './Type'

export class InstanceProvider extends BaseProvider {
  public async getStatus(): Promise<InstanceStatusResponse> {
    return await this.getRequest().addSegment('status').send(HttpMethodEnum.GET)
  }

  public async getDevice(): Promise<InstanceDeviceResponse> {
    return await this.getRequest().addSegment('device').send(HttpMethodEnum.GET)
  }

  public async getQRCodeImage(): Promise<InstanceQRCodeResponse> {
    return await this.getRequest()
      .addSegment('qr-code')
      .addSegment('image')
      .send(HttpMethodEnum.GET)
  }

  public async disconnect(): Promise<void> {
    await this.getRequest().addSegment('disconnect').send(HttpMethodEnum.GET)
  }
}
