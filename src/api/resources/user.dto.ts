import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { User } from '../../schemas/user.schema'

export class UserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  email: string

  @IsNumber()
  @IsNotEmpty()
  weight: number

  @IsNumber()
  @IsNotEmpty()
  height: number

  constructor(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    email: string,
    weight: number,
    height: number,
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.username = username
    this.password = password
    this.weight = weight
    this.height = height
    this.email = email
  }
}
