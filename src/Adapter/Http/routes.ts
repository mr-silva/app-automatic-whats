import { Router } from 'express'
import { MakeContextMiddleware, MakeRequestContextService } from '#framework'
import { TaskHandler, AccountHandler } from './Handler'

const router = Router()

const taskHandler = new TaskHandler()
const accountHandler = new AccountHandler()

router.route('/authenticate').post(accountHandler.authenticate.bind(accountHandler))

const contextMiddleWare = new MakeContextMiddleware(new MakeRequestContextService())

router.use(contextMiddleWare.handle)

router
  .route('/account')
  .get(accountHandler.getOneById.bind(accountHandler))
  .patch(accountHandler.updateConfigs.bind(accountHandler))

router.route('/whatsapp/status').get(accountHandler.whatsConnectionStatus.bind(accountHandler))
router.route('/whatsapp/disconnect').post(accountHandler.whatsDisconnect.bind(accountHandler))

router.route('/task').post(taskHandler.create.bind(taskHandler))

export { router }
