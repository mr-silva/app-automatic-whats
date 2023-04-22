import { ITaskItemRawDataInterface } from '#domain'
import { IInstanceStatusResponseDto } from '../../Adapter/Service/ZApi'

export interface IZApiAppService {
  setProfileData(instance: string, token: string): this
  sendMessage(campaignMessage: string, contactPayload: ITaskItemRawDataInterface): Promise<void>
  getStatus(): Promise<IInstanceStatusResponseDto>
  disconnect(): Promise<void>
}
