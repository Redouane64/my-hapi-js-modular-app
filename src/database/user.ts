import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
  AllowNull,
  Default,
  Unique,
  Validate
} from 'sequelize-typescript'
import * as uuid from 'uuid'

export interface UserDto {
  id: string
  username: string
  email: string
}

export type CreateOrUpdateUser = Omit<UserDto, 'id'>

@Table({
  tableName: 'users'
})
export class Users extends Model<UserDto, CreateOrUpdateUser> implements UserDto {
  @PrimaryKey
  @AllowNull(false)
  @Default(uuid.v4())
  @Column(DataType.UUID)
  id: string

  @Unique
  @AllowNull(false)
  @Validate({ isAlphanumeric: true })
  @Column(DataType.STRING)
  username: string

  @Unique
  @AllowNull
  @Column(DataType.STRING)
  email: string
}
