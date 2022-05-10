import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ViewLiftRootDto {
  @IsNotEmpty()
  @IsString()
  userId: string

  @IsNotEmpty()
  @IsString()
  label: string

  @IsNotEmpty()
  @IsString()
  currentPrLogId: string

  @IsNotEmpty()
  @IsNumber()
  createdAt: number

  @IsNotEmpty()
  @IsNumber()
  updatedAt: number

  constructor(
    userId: string,
    label: string,
    currentPrLogId: string,
    createdAt: number,
    updatedAt: number,
  ) {
    this.userId = userId
    this.label = label
    this.currentPrLogId = currentPrLogId
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
