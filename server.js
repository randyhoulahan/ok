const fastify = require('fastify')({})

fastify.get('/ok', async (request, reply) => {
  reply.type('application/json').code(200)
  return 'ok'
})

fastify.listen(8888, (err, address) => {
  if (err) throw err
  console.info(`server listening on ${address}`)
})