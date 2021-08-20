import { Plugin, Server } from '@hapi/hapi'
import * as pkg from '../../package.json'
import { Sequelize } from 'sequelize-typescript'
import { CreateOrUpdateUser, UserDto, Users } from './user'
import { Op } from 'sequelize'

export type DatabaseOptions = {
  host?: string
  port?: number
  username?: string
  password?: string
  dialect?: 'postgres' | 'sqlite'
}

export const Database: Plugin<DatabaseOptions> = {
  name: 'database',
  version: pkg.version,
  register: async (server: Server, options?: DatabaseOptions) => {
    let sequelize: Sequelize
    if (options?.dialect === 'sqlite') {
      sequelize = new Sequelize('sqlite::memory:', {
        models: [Users],
        logging: false,
        sync: {
          force: true,
          alter: true
        }
      })
      await sequelize.sync()
    } else {
      sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        database: process.env.POSTGRES_DATABASE,
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        models: [Users]
      })
    }

    server.expose(sequelize)
    server.method(createUser.name, createUser)
    server.method(getUsers.name, getUsers)
    server.method(getUser.name, getUser)
  }
}

const createUser = async (user: CreateOrUpdateUser): Promise<Users> => {
  return await Users.create(user, { raw: true })
}

const getUsers = async (): Promise<Users[]> => {
  return await Users.findAll({
    raw: true
  })
}

const getUser = async (
  user: Partial<Pick<UserDto, 'email' | 'username'>>
): Promise<Users | null> => {
  const conditions = []

  if (user.email !== undefined) {
    conditions.push({ email: user.email })
  }

  if (user.username !== undefined) {
    conditions.push({ username: user.username })
  }

  return await Users.findOne({
    where: { [Op.or]: conditions },
    raw: true
  })
}
