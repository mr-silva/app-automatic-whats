import { ErrorDetail } from '../Entity/ErrorDetail'
import { BaseError } from './BaseError'

export class DataNotFound extends BaseError {
  constructor(message: string = 'Item not found.', details: Array<ErrorDetail> = []) {
    super(message, details)
  }
}
