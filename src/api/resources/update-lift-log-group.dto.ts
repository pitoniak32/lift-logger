import { PartialType } from '@nestjs/mapped-types'
import { CreateLiftLogGroupDto } from './create-lift-log-group.dto'

export class UpdateLiftLogGroupDto extends PartialType(CreateLiftLogGroupDto) {}
