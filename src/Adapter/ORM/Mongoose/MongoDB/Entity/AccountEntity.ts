import { Configs } from '../ValueObject'

export class AccountEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public configs: Configs,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
