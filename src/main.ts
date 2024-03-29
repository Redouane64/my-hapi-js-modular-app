import { config } from 'dotenv'
config()
// eslint-disable-next-line import/first
import { createServer } from './server'

async function bootstrap(): Promise<void> {
  const server = await createServer()
  server.start()
}
bootstrap()
