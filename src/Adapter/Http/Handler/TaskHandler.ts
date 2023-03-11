import { NextFunction, Request, Response } from 'express'
import { Factory } from '../../Factory'
import { ResponseEntity, HttpStatusEnum } from '../../../../framework'

export class TaskHandler {
  public async create(request: Request, response: Response, next: NextFunction) {
    try {
      await new Factory(request.header('X-Account'))
        .buildUseCaseFactory()
        .buildTask()
        .buildCreateUseCase()
        .execute(request.body)

      return new ResponseEntity(response, {}, HttpStatusEnum.NO_CONTENT).build()
    } catch (error) {
      console.error(error)
      next(error)
    }
  }
}
