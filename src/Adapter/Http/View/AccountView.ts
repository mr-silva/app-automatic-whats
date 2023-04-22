import { ViewContract } from '#framework'
import { Account } from '#domain'

export class AccountView extends ViewContract<Account, IAccountView> {
  render(entity: Account): IAccountView {
    return {
      id: entity.getId(),
      name: entity.getName(),
      configs: {
        zApi: {
          instance: entity.getConfigs().getZApiInstance() || null,
          token: entity.getConfigs().getZApiToken() || null
        }
      }
    }
  }
}

interface IAccountView {
  id: string
  name: string
  configs: {
    zApi: {
      instance: string | null
      token: string | null
    }
  }
}
