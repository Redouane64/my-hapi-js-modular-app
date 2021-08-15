import { Request, ResponseToolkit, ServerRoute } from '@hapi/hapi'

export const register: ServerRoute = {
  path: '/',
  method: 'POST',
  options: {
    tags: ['register'],
    id: 'register'
  },
  handler: async (request: Request, reply: ResponseToolkit) => {
    return reply.response()
  }
}

export const login: ServerRoute = {
  path: '/',
  method: 'GET',
  options: {
    tags: ['login'],
    id: 'login'
  },
  handler: async (request: Request, reply: ResponseToolkit) => {
    return reply.response()
  }
}