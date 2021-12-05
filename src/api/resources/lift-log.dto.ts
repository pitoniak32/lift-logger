import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class LiftLogDto {
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
  dayOfLog: number

  constructor(
    userId: string,
    liftId: string,
    title: string,
    notes: string,
    location: string,
  ) {
    this.userId = userId
    this.liftId = liftId
    this.title = title
    this.notes = notes
    this.location = location
  }
}
