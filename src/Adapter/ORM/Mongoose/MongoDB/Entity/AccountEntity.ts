import { Configs } from '../ValueObject'

export class AccountEntity {
  constructor(
    public id: string,
    public configs: Configs,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
