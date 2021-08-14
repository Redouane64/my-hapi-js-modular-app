import * as Pino from 'hapi-pino'
import { Server } from '@hapi/hapi'

export const createServer = async (): Promise<Server> => {
  const server = new Server({
    host: process.env.HOST,
    port: process.env.PORT
  })

  await server.register({
    plugin: Pino,
    options: {
      prettyPrint: true
    }
  })

  return server
}
