import { ZApiService } from '../../../Adapter/Service'

export class ApplicationServiceFactory {
  public buildZApiService() {
    return new ZApiService()
  }
}
