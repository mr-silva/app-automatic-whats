import * as dotenv from 'dotenv'
import httpServer from '../Adapter/Http/server'
import './queue'

dotenv.config()
httpServer.start()
