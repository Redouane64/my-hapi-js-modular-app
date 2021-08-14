import { Column, Model, PrimaryKey, Table, DataType } from 'sequelize-typescript'

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
    @Column(DataType.UUID)
    id: string

    @Column(DataType.STRING)
    username: string

    @Column(DataType.STRING)
    email: string
}
