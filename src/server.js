import Fastify from 'fastify'
import dotenv from 'dotenv'
import {ObjectId} from 'mongodb'
import {DB} from './db/db.js'
import logger from './utils/log.utils.js'

dotenv.config()

const server = async () => {
  try {
    const fastify = Fastify({logger})

    console.log(process.env.url,process.env.db_name)

    global.dbService = new DB(
      process.env.url,
      process.env.db_name,
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