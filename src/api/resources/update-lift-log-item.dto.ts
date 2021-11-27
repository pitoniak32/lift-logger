import { PartialType } from '@nestjs/mapped-types'
import { CreateLiftLogItemDto } from './create-lift-log-item.dto'

export class UpdateLiftLogItemDto extends PartialType(CreateLiftLogItemDto) {}
