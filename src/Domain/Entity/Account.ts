import { Configs } from '../ValueObject/Configs'
import { Base } from './Base'

export class Account extends Base {
  constructor(private configs: Configs, id?: string, createdAt?: Date, updatedAt?: Date) {
    super(id, createdAt, updatedAt)
  }

  public getConfigs(): Configs {
    return this.configs
  }

  public setConfigs(configs: Configs): this {
    this.configs = configs
    return this
  }
}
