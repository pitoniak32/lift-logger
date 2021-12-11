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
  UseGuards,
} from '@nestjs/common'
import { Request, Response } from 'express'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { UserDto } from '../../resources/user.dto'
import { UserService } from '../../services/user/user.service'
import { ViewUserDto } from '../../resources/view-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from '../../../auth/auth.service'
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard'

@Controller('v1/user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Req() request: Request) {
    return await this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile() {
    return await this.userService.getUsers()
  }

  @Post('create')
  @ApiCreatedResponse({ description: 'user created', type: String })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid request body.' })
  @HttpCode(HttpStatus.CREATED)
  async createUserLog(
    @Body() createUser: UserDto,
  ): Promise<ViewUserDto> {
    return await this.userService.createUser(createUser)
  }

  @Get()
  @ApiOkResponse({ description: 'user(s) found' })
  @ApiNotFoundResponse({ description: 'user(s) not found' })
  @HttpCode(HttpStatus.OK)
  async getUsers(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<ViewUserDto[]> {
    console.log(request.cookies)
    response.cookie('test-cookie', 'value1')
    return await this.userService.getUsers()
  }

  @Get(':id')
  @ApiOkResponse({ description: 'user found' })
  @ApiNotFoundResponse({ description: 'user not found' })
  @HttpCode(HttpStatus.OK)
  async getOneUser(@Param('id') id: string): Promise<ViewUserDto> {
    return await this.userService.getOneUser(id)
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'user deleted' })
  async deleteOneUser(
    @Param('id') id: string,
  ): Promise<ViewUserDto> {
    return this.userService.deleteOneUser(id)
  }
}
