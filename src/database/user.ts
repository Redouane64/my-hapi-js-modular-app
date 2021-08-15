import { Column, Model, Table, DataType } from 'sequelize-typescript'
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
    @Column({
      type: DataType.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: uuid.v4()
    })
    id: string

    @Column(DataType.STRING)
    username: string

    @Column(DataType.STRING)
    email: string
}
