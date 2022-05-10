import { IsNotEmpty, IsString } from 'class-validator'

export class LiftRootDto {
  @IsNotEmpty()
  @IsString()
  userId: string

  @IsNotEmpty()
  @IsString()
  label: string

  @IsString()
  currentPrLogId: string

  constructor(userId: string, label: string, currentPrLogId: string) {
    this.userId = userId
    this.label = label
    this.currentPrLogId = currentPrLogId
  }
}
