import * as dotenv from 'dotenv'
import { Queue } from '../Event/queue'
import httpServer from './server'
;(async () => {
  new Queue().init()
})()

dotenv.config()
httpServer.start()
