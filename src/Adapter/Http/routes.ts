import { Router } from 'express'
import { TaskHandler, AccountHandler } from './Handler'

const router = Router()

const taskHandler = new TaskHandler()
const accountHandler = new AccountHandler()

router.route('/task').post(taskHandler.create.bind(taskHandler))

router
  .route('/account')
  .get(accountHandler.getOneById.bind(accountHandler))
  .patch(accountHandler.updateConfigs.bind(accountHandler))

export { router }
