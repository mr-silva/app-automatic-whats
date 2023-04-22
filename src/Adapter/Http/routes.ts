import { Router } from 'express'
import { MakeContextMiddleware, MakeRequestContextService } from '#framework'
import { TaskHandler, AccountHandler } from './Handler'

const router = Router()

const contextMiddleWare = new MakeContextMiddleware(new MakeRequestContextService())

const taskHandler = new TaskHandler()
const accountHandler = new AccountHandler()

router.use(contextMiddleWare.handle)

router
  .route('/account')
  .get(accountHandler.getOneById.bind(accountHandler))
  .patch(accountHandler.updateConfigs.bind(accountHandler))

router.route('/task').post(taskHandler.create.bind(taskHandler))

export { router }
