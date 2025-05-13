import Fastify from 'fastify'
import dotenv from 'dotenv'
import {DB} from './db/db.js'
import logger from './utils/log.utils.js'
import routes from './routes/routes.js'

dotenv.config()

const server = async () => {
  try {
    const fastify = Fastify(logger)
    fastify.register(routes)

    console.log(process.env.url,process.env.db_name)

    global.dbService = new DB(
      process.env.url,
      process.env.db_name,
    )

    connect_server(fastify)
  } catch (err) {
    throw err
  }
}

const connect_server = (fastify) => {
  fastify.listen({
    port: 5000,
    host: '0.0.0.0'
  }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    console.log(`Server Listen on Port ${5000}`);
  })
}

server()