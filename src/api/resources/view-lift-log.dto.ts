import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ViewLiftLogDto {
  @IsString()
  @IsNotEmpty()
  userId: string

  @IsString()
  @IsNotEmpty()
  liftId: string

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  notes: string

  @IsString()
  @IsNotEmpty()
  location: string

  @IsNumber()
  @IsNotEmpty()
  createdAt: number

  @IsNumber()
  @IsNotEmpty()
  updatedAt: number

  constructor(
    userId: string,
    liftId: string,
    title: string,
    notes: string,
    location: string,
    createdAt: number,
    updatedAt: number,
  ) {
    this.userId = userId
    this.liftId = liftId
    this.title = title
    this.notes = notes
    this.location = location
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
