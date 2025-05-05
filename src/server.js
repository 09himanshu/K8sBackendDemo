import Fastify from 'fastify'
import {DB} from './db/db.js'
import {ObjectId} from 'mongodb'

const server = async () => {
  try {
    const fastify = Fastify({
      logger: {
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          }
        },
        serializers: {
          req(req) {
            return {
              method: req.method,
              url: req.url,
              headers: req.headers,
              hostname: req.hostname,
              remoteAddress: req.ip,
              remotePort: req.socket.remotePort
            };
          },
          res(res) {
            return {
              statusCode: res.statusCode
            };
          }
        }
      }
    })

    const database = new DB(
      'mongodb://Q4VXIOH8KQ:haguzhn9ubk6fgyg53@akdev.developer.akunah.com:54103/promsv2?authSource=admin&authMechanism=SCRAM-SHA-1',
      'promsv2',
    )

    fastify.get('/getData', async(req, res) => {
      try {
        let data = await database.find('test_collection')
        res.status(200).send({status: true, data: data[0]})
      } catch (err) {
        throw err
      }
    })

    fastify.get('/insertData', async(req, res) => {
      try {
        let body = {
          $inc: { count: 1 }
        }
        let filter = {_id:  new ObjectId('68184858dd31415b8724e7a3')}
        await database.update('test_collection',filter,  body)

        res.status(200).send({status: true, data: 'Data inserted sucessfully'})
      } catch (err) {
        console.log(err);
      }
    })

    connect_server(fastify)
  } catch (err) {
    throw err
  }
}

const connect_server = (fastify) => {
  fastify.listen({port: 8000}, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    console.log(`Server Listen on Port ${8000}`);
  })
}

server()