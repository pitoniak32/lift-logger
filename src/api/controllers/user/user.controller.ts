import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common'
import { Request, Response, response } from 'express'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { UserDto } from '../../resources/user.dto'
import { UserService } from '../../services/user/user.service'

@Controller('v1/user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiCreatedResponse({ description: 'user created', type: String })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid request body.' })
  @HttpCode(HttpStatus.CREATED)
  async createUserLog(
    @Body() createUser: UserDto,
  ): Promise<UserDto> {
    return await this.userService.createUser(createUser)
  }

  @Get()
  @ApiOkResponse({ description: 'user(s) found' })
  @ApiNotFoundResponse({ description: 'user(s) not found' })
  @HttpCode(HttpStatus.OK)
  async getUsers(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<UserDto[]> {
    console.log(request.cookies)
    response.cookie('test-cookie', 'value1')
    return await this.userService.getUsers()
  }

  @Get(':id')
  @ApiOkResponse({ description: 'user found' })
  @ApiNotFoundResponse({ description: 'user not found' })
  @HttpCode(HttpStatus.OK)
  async getOneUser(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.getOneUser(id)
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'user deleted' })
  async deleteOneUser(
    @Param('id') id: string,
  ): Promise<UserDto> {
    return this.userService.deleteOneUser(id)
  }
}
