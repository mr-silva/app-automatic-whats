import { InvalidDataException } from '#framework'

export class AccountWithoutZApiInstanceOrTokenException extends InvalidDataException {
  constructor() {
    super('Account does not have [Z-API] instance or token defined.')
  }
}
