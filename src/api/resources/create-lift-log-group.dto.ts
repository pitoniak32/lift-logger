import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, ValidateNested } from "class-validator"
import { CreateLiftLogItemDto } from "./create-lift-log-item.dto"

export class CreateLiftLogGroupDto {
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
  items: CreateLiftLogItemDto[]
}