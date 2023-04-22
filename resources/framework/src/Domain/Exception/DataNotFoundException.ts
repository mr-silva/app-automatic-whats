import { ErrorDetail } from '../Entity/ErrorDetail'
import { BaseException } from './BaseException'

export class DataNotFoundException extends BaseException {
  constructor(message: string = 'Item not found.', details: Array<ErrorDetail> = []) {
    super(message, details)
  }
}
