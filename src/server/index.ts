import * as Pino from 'hapi-pino'
import { Server } from '@hapi/hapi'
import { Api } from '../api'
import { Database } from '../database'

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

  await server.register({
    plugin: Database
  })

  await server.register({
    plugin: Api
  })

  return server
}
