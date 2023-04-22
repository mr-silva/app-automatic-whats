import { DataNotFoundException } from '#framework'

export class AccountNotFoundException extends DataNotFoundException {
  constructor() {
    super('Account not found.')
  }
}
