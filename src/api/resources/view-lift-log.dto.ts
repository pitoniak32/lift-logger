import { IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ViewLiftLogGroupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'squat pr',
    description: 'title of the lifting log.',
  })
  title: string

  @IsNotEmpty()
  @ApiProperty({
    example: [
      {
        title: "squat pr group",
        items: [{title: "squat", content: "225 for 1"}],
      }
    ],
    description: 'composite of groups and items.',
  })
  @ValidateNested()
  items: ViewLiftLogItemDto[]

  constructor(title: string, items: ViewLiftLogItemDto[]) {
    this.title = title
    this.items = items
  }
}

export class ViewLiftLogItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'squat pr',
    description: 'title of the lifting log.',
  })
  title: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
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