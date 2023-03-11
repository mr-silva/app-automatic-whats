import { ITaskItemRawDataInterface } from '../../Domain'

export interface IZApiAppService {
  setProfileData(instance: string, token: string): this
  sendMessage(campaignMessage: string, contactPayload: ITaskItemRawDataInterface): Promise<void>
}
