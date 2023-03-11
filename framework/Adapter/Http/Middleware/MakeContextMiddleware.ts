import { NextFunction, Request, Response } from 'express'
import { RequestContext } from '../Entity'

export class MakeContextMiddleware {
  constructor(private readonly appSecret: string, private readonly isWebhook: boolean = false) {
    this.handle = this.handle.bind(this)
  }

  public handle(request: Request, response: Response, next: NextFunction) {
    const accountId = request.header('X-Account-Id') || undefined
    const secret = request.header('X-Authorization') || undefined

    if (!this.isWebhook && !accountId) {
      response.status(400).json({
        message: 'Account id is required'
      })
      return
    }

    if (!this.isWebhook && !secret) {
      response.status(400).json({
        message: 'APP secret is required'
      })
      return
    }

    if (secret && secret !== this.appSecret) {
      response.status(401).json({
        message: 'APP secret is invalid'
      })
      return
    }

    request.context = new RequestContext(secret, accountId)

    next()
  }
}
