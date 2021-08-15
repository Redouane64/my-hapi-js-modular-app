import { Plugin, Server } from '@hapi/hapi'
import * as pkg from '../../package.json'
import { users } from './routes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Api: Plugin<any> = {
  name: 'api',
  version: pkg.version,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: async (server: Server, options: any) => {
    server.route(users)
  }
}
