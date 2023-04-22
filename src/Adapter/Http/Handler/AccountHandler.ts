import { NextFunction, Request, Response } from 'express'
import { Factory } from '#factory'
import { ResponseEntity } from '#framework'
import { AccountView, AccountWhatsView } from '../View'

export class AccountHandler {
  public async getOneById(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await Factory.getInstance()
        .setContext(request.context.toApplication())
        .buildUseCaseFactory()
        .buildAccount()
        .buildGetOneById()
        .execute()

      return new ResponseEntity(response).ok(new AccountView().render(result))
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

      return new ResponseEntity(response).ok(new AccountView().render(result))
    } catch (error) {
      console.error(error)
      next(error)
    }
  }

  public async authenticate(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await Factory.getInstance()
        .buildUseCaseFactory()
        .buildAccount()
        .buildAuthenticate()
        .execute(request.body)

      return new ResponseEntity<{ token: string }>(response).ok({ token: result.getToken()! })
    } catch (error) {
      console.error(error)
      next(error)
    }
  }

  public async whatsConnectionStatus(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await Factory.getInstance()
        .setContext(request.context.toApplication())
        .buildUseCaseFactory()
        .buildAccount()
        .buildWhatsConnectionStatus()
        .execute()

      return new ResponseEntity(response).ok(new AccountWhatsView().render(result))
    } catch (error) {
      console.error(error)
      next(error)
    }
  }
}
