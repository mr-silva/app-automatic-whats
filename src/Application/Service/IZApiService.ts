import { ITaskItemRawDataInterface } from '#domain'

export interface IZApiAppService {
  setProfileData(instance: string, token: string): this
  sendMessage(campaignMessage: string, contactPayload: ITaskItemRawDataInterface): Promise<void>
}
