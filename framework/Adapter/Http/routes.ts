import { Router } from 'express'
import { HealthStatusEnum } from '../../Domain/Enum/HealthStatusEnum'
import { ResponseEntity } from './Entity/ResponseEntity'

const healthCheckRouter = Router()

healthCheckRouter.get('/health', async (_, response) =>
  new ResponseEntity(response).ok({
    status: HealthStatusEnum.OK
  })
)

export { healthCheckRouter }
