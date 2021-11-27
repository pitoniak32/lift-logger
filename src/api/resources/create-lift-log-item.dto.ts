import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateLiftLogItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'squat pr',
    description: 'title of the lifting log.',
  })
  title: string

  @IsString()
  @ApiPropertyOptional({
    example: '225 for 1',
    description: 'content of the lift log.',
  })
  content: string

  @IsNotEmpty()
  @ApiProperty({
    example: '',
    description: 'time related to lift log.'
  })
  date: Date

  constructor(title: string, content: string, date: Date) {
    this.title = title
    this.content = content
    this.date = date
  }
}
