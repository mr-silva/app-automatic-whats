import { HttpMethodEnum, InvalidDataException } from '#framework'
import { BaseProvider } from '../BaseProvider'
import { InstanceDeviceResponse, InstanceStatusResponse } from './Type'

export class InstanceProvider extends BaseProvider {
  public async getStatus(): Promise<InstanceStatusResponse> {
    return await this.getRequest().addSegment('status').send(HttpMethodEnum.GET)
  }

  public async getDevice(): Promise<InstanceDeviceResponse> {
    return await this.getRequest().addSegment('device').send(HttpMethodEnum.GET)
  }
}
