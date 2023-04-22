import { Factory } from '#factory'
import { MongooseMongoDBDatabase } from '../ORM/Mongoose'
import httpServer from './app'

function start() {
  const mongoDatabase = new MongooseMongoDBDatabase()

  httpServer.listen(httpServer.get('port'), async () => {
    console.info(
      'App is running at http://localhost:%d in %s mode',
      httpServer.get('port'),
      httpServer.get('env')
    )

    try {
      await mongoDatabase.validate()

      Factory.getInstance()
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  })
}

export default { start }
