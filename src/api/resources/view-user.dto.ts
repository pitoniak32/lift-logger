import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ViewUserDto {
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
  email: string

  @IsNumber()
  @IsNotEmpty()
  weight: number

  @IsNumber()
  @IsNotEmpty()
  height: number

  @IsNumber()
  @IsNotEmpty()
  createdAt: number

  @IsNumber()
  @IsNotEmpty()
  updatedAt: number


  constructor(
    firstName: string,
    lastName: string,
    email: string,
    weight: number,
    height: number,
    createdAt: number,
    updatedAt: number,
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.weight = weight
    this.height = height
    this.email = email
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
