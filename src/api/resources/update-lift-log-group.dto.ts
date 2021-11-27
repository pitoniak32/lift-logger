import { IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { UpdateLiftLogItemDto } from './update-lift-log-item.dto'

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
    description: 'list of lift log items',
  })
  @ValidateNested()
  items: UpdateLiftLogItemDto[]
}
