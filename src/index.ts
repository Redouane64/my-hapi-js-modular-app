import { config } from 'dotenv'
config()

// eslint-disable-next-line import/first
import { Server } from '@hapi/hapi'

(async function (): Promise<void> {
  const server = new Server({
    host: process.env.HOST,
    port: process.env.PORT
  })

  await server.start()
})()
