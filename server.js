const fastify = require('fastify')({})
const disk = require('diskusage')

fastify.get('/ok', async (request, reply) => {

  reply.type('application/json').code(200)

  if(!process.env.DISK_SPACE) return 'ok'

  const isOk = await isOk(process.env.DISK_SPACE)

  return isOk
})

fastify.listen(8888,'0.0.0.0', (err, address) => {
  if (err) throw err
  console.info(`server listening on ${address}`)
})

async function isOk(path) {
  try {
    const { available, total } = await disk.check(path)
    const percent = Math.round((available/total)*100)
    
    if(percent > 10) return 'ok'
    return percent
  } catch (err) {
    console.error(err)
    return 0
  }
}
