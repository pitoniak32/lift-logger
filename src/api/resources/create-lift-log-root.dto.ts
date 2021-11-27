import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, ValidateNested } from 'class-validator'
import { CreateLiftLogGroupDto } from './create-lift-log-group.dto'

export class CreateLiftLogRootDto {
  @IsNotEmpty()
  @ValidateNested()
  liftLogGroups: CreateLiftLogGroupDto[]

  constructor(liftLogGroups: CreateLiftLogGroupDto[]) {
    this.liftLogGroups = liftLogGroups
  }
}

export class UpdateLiftLogRootDto extends PartialType(CreateLiftLogRootDto) {}
