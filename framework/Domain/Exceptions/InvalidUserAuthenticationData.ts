import { ErrorDetail } from '../Entity/ErrorDetail'
import { BaseError } from './BaseError'

export class InvalidUserAuthenticationData extends BaseError {
  public constructor(
    message: string = 'Invalid user authentication data',
    details: Array<ErrorDetail> = []
  ) {
    super(message, details)
  }
}
