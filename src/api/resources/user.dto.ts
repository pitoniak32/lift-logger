import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class UserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

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
    email: string,
    weight: number,
    height: number,
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.weight = weight
    this.height = height
    this.email = email
  }
}
