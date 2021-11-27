import { IsNotEmpty, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateLiftLogDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: 'squat pr', description: 'title of the lifting log.'})
  title: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: '225 for 1 rep', description: 'content for the lifting log.'})
  content: string
}
