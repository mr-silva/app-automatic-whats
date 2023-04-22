import { NextFunction, Request, Response } from 'express'
import { Factory } from '#factory'
import { ResponseEntity } from '#framework'
import { TaskValidator } from '../Validator'

export class TaskHandler {
  public async create(request: Request, response: Response, next: NextFunction) {
    try {
      await new TaskValidator().validateCreatePayload(request.body)

      await Factory.getInstance()
        .setContext(request.context.toApplication())
        .buildUseCaseFactory()
        .buildTask()
        .buildCreateUseCase()
        .execute(request.body)

      return new ResponseEntity(response).noContent()
    } catch (error) {
      console.error(error)
      next(error)
    }
  }
}
