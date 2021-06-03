const fastify = require('fastify'         )({})
const df      = require('@sindresorhus/df')

const PATH = process.env.DISK_SPACE_PATH


fastify.get('/ok', async (request, reply) => {

  reply.type('application/json').code(200)

  if(!PATH) return 'ok'

  return isOk(PATH)
})

fastify.listen(8888,'0.0.0.0', (err, address) => {
  if (err) throw err
  console.info(`server listening on ${address}`)
})

async function isOk(path) {
  try {
    const RATE = process.env.DISK_SPACE_ALARM_RATE
    const { size, available } = await df.file(path)
    const percent = Math.round((available/size)*100)

    console.info(`Disk space available: ${percent}%`)

    if(percent > RATE ) return 'ok'
    
    console.warn(`Disk space critically low: ${percent}% free`)
    return percent
    
  } catch (err) {
    console.error(err)
    return 0
  }
}
