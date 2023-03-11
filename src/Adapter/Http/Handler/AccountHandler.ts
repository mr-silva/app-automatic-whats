import { NextFunction, Request, Response } from 'express'
import { Factory } from '../../Factory'
import { ResponseEntity, HttpStatusEnum } from '../../../../framework'

export class AccountHandler {
  public async getOneById(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await new Factory(request.header('X-Account'))
        .buildUseCaseFactory()
        .buildAccount()
        .buildGetOneById()
        .execute()

      return new ResponseEntity(response, result, HttpStatusEnum.OK).build()
    } catch (error) {
      console.error(error)
      next(error)
    }
  }

  public async updateConfigs(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await new Factory(request.header('X-Account'))
        .buildUseCaseFactory()
        .buildAccount()
        .buildUpdateConfigs()
        .execute(request.body)

      return new ResponseEntity(response, result, HttpStatusEnum.OK).build()
    } catch (error) {
      console.error(error)
      next(error)
    }
  }
}
