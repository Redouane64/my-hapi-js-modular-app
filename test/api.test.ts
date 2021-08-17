import Lab from '@hapi/lab'
import { expect } from '@hapi/code'
import { Server } from '@hapi/hapi'
import { Api } from '../src/api'

const { describe, it, before, after } = exports.lab = Lab.script()

describe('api', () => {
  let server: Server

  before(async () => {
    server = new Server()
    await server.register({
      plugin: Api
    })

    await server.start()
  })

  after(async () => {
    await server.stop()
  })

  it('register user', async () => {
    const response = await server.inject({
      url: '/api/users',
      method: 'POST'
    })

    expect(response.statusCode).to.equal(204)
  })

  it('login user', async () => {
    const response = await server.inject({
      url: '/api/users',
      method: 'GET'
    })

    expect(response.statusCode).to.equal(204)
  })
})
