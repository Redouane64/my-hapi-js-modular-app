import { Request, ResponseToolkit, ServerRoute } from '@hapi/hapi'
import { CreateOrUpdateUser, UserDto } from '../../database/user'

export const register: ServerRoute = {
  path: '/users',
  method: 'POST',
  options: {
    tags: ['register'],
    id: 'register'
  },
  handler: async (request: Request, reply: ResponseToolkit) => {
    const { email, username } = request.payload as CreateOrUpdateUser
    const user = await request.server.methods.createUser({ username, email })
    return reply.response(user).code(200)
  }
}

export const login: ServerRoute = {
  path: '/users',
  method: 'GET',
  options: {
    tags: ['login'],
    id: 'login'
  },
  handler: async (request: Request, reply: ResponseToolkit) => {
    const { email, username } = request.payload as Partial<Pick<UserDto, 'email' | 'username'>>
    const user = await request.server.methods.getUser({ username, email })

    if (user === null) {
      return reply.response().code(401)
    }

    return reply.response(user).code(200)
  }
}
