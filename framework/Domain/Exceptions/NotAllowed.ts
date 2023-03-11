import { ErrorDetail } from '../Entity/ErrorDetail'
import { BaseError } from './BaseError'

export class NotAllowed extends BaseError {
  public constructor(
    message: string = 'You are not allowed to do it.',
    details: Array<ErrorDetail> = []
  ) {
    super(message, details)
  }
}
