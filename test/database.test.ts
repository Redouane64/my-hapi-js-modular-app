import Lab from '@hapi/lab'
import { expect } from '@hapi/code'
import { Server } from '@hapi/hapi'
import { Database } from '../src/database'

const { describe, it, before } = exports.lab = Lab.script()

describe('database', () => {
  let server: Server

  before(async () => {
    server = new Server()
    await server.register({
      plugin: Database,
      options: {
        dialect: 'sqlite'
      }
    })
    await server.initialize()
  })

  it('database method registered', () => {
    expect(server.methods.createUser).to.be.function()
    expect(server.methods.getUsers).to.be.function()
    expect(server.methods.getUser).to.be.function()
  })

  it('create user', async () => {
    const result = await server.methods.createUser({
      username: 'alex',
      email: 'alex@live.com'
    })

    expect(result).to.be.not.false()
  })

  it('get user', async () => {
    const result = await server.methods.getUser({
      username: 'alex',
      email: 'alex@live.com'
    })

    expect(result).to.be.not.null()
  })

  it('get users', async () => {
    const result = await server.methods.getUsers()

    expect(result).to.be.array()
  })
})
