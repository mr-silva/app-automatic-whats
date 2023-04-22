import { NextFunction, Request, Response } from 'express'
import { Factory } from '#factory'
import { ResponseEntity, HttpStatusEnum } from '#framework'

export class AccountHandler {
  public async getOneById(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await Factory.getInstance()
        .setContext(request.context.toApplication())
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
      const result = await Factory.getInstance()
        .setContext(request.context.toApplication())
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
