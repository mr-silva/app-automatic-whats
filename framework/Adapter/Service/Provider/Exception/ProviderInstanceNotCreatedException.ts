import { BaseError } from '../../../../Domain'

export class ProviderInstanceNotCreatedException extends BaseError {
  constructor() {
    super('Provider request instance is not created.')
  }
}
