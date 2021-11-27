import { IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateLiftLogGroupDto {
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
}