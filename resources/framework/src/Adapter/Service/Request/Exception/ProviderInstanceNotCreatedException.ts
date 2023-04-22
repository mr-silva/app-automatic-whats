import { BaseException } from '../../../../Domain'

export class ProviderInstanceNotCreatedException extends BaseException {
  constructor() {
    super('Provider request instance is not created.')
  }
}
