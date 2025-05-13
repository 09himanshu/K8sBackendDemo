import * as Controller from '../controller/fetch..controller.js'

export default async function (fastify) {
  fastify.get('/getData', Controller.getData)
  fastify.post('/insertData', Controller.insertData)
  fastify.put('/updateData', Controller.updateData)
}