import { ITaskItemRawDataInterface } from '../../Domain'

export interface IZApiAppService {
  sendMessage(campaignMessage: string, contactPayload: ITaskItemRawDataInterface): Promise<void>
}
