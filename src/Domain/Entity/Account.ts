import crypto from 'crypto'
import { Configs } from '../ValueObject'
import { Base } from './Base'

export class Account extends Base {
  constructor(
    private name: string,
    private email: string,
    private password: string,
    private configs: Configs,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt)
  }

  public getConfigs(): Configs {
    return this.configs
  }

  public getName(): string {
    return this.name
  }

  public getEmail(): string {
    return this.email
  }

  public getEncodedPassword(): string {
    const sha256 = (str: string) => crypto.createHash('sha256').update(str).digest('hex')
    return sha256(sha256(this.password))
  }

  public setConfigs(configs: Configs): this {
    this.configs = configs
    return this
  }
}
