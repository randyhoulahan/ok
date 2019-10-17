const fastify = require('fastify')({})
const df = require('@sindresorhus/df');

fastify.get('/ok', async (request, reply) => {

  reply.type('application/json').code(200)

  if(!process.env.DISK_SPACE_PATH) return 'ok'

  return isOk(process.env.DISK_SPACE_PATH)
})

fastify.listen(8888,'0.0.0.0', (err, address) => {
  if (err) throw err
  console.info(`server listening on ${address}`)
})

async function isOk(path) {
  try {
    const { size, available } = await df.file(path)
    const percent = Math.round((available/size)*100)

    if(percent > 10) return 'ok'
    
    console.warn(`Disk space critically low: ${percent}% free`)
    return percent
    
  } catch (err) {
    console.error(err)
    return 0
  }
}
