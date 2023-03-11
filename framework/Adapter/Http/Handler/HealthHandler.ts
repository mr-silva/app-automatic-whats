import { NextFunction, Request, Response } from 'express'
import { ResponseEntity, IHealthResponse, HttpStatusEnum } from '../'
import { HealthStatusEnum } from '../../../Domain'

export class HealthHandler {
  public async checkHealth(request: Request, response: Response, next: NextFunction) {
    try {
      return new ResponseEntity<IHealthResponse>(
        response,
        { status: HealthStatusEnum.OK },
        HttpStatusEnum.OK
      ).build()
    } catch (error) {
      console.error(error)
      next(error)
    }
  }
}
