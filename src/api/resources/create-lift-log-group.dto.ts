import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { CreateLiftLogItemDto } from './create-lift-log-item.dto'

export class CreateLiftLogGroupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'squat pr',
    description: 'title of the lifting log.',
  })
  title: string

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty({
    example: [{ title: 'squat', content: '225 for 1' }],
    description: 'list of lift log items.',
  })
  items: CreateLiftLogItemDto[]

  constructor(title: string, items: CreateLiftLogItemDto[]) {
    this.title = title
    this.items = items
  }
}
