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
import { UserService } from '../../../services/user/user.service'
import { ViewUserDto } from '../../resources/view-user.dto'
import { AuthService } from '../../../services/auth/auth.service'
import { JwtAccessAuthGuard } from '../../../services/auth/guards/jwt-access-auth.guard'
import { LocalAuthGuard } from '../../../services/auth/guards/local-auth.guard'
import { JwtRefreshAuthGuard } from '../../../services/auth/guards/jwt-refresh-auth.guard'

@Controller('v1/user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({passthrough: true}) response: Response,
    @Req() request: Request,
  ) {
    const { access_token, refresh_token } = await this.authService.login(request.user) 

    response.cookie('jibs', refresh_token, { httpOnly: true })

    return { access_token } 
  }

  @ApiOkResponse()
  @ApiBadRequestResponse()
  @UseGuards(JwtRefreshAuthGuard)
  @Post()
  async refresh() {
    
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
  @UseGuards(JwtAccessAuthGuard)
  @ApiOkResponse({ description: 'user(s) found' })
  @ApiNotFoundResponse({ description: 'user(s) not found' })
  @HttpCode(HttpStatus.OK)
  async getUsers(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<ViewUserDto[]> {
    return await this.userService.getUsers()
  }

  @Get(':id')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOkResponse({ description: 'user found' })
  @ApiNotFoundResponse({ description: 'user not found' })
  @HttpCode(HttpStatus.OK)
  async getOneUser(@Param('id') id: string): Promise<ViewUserDto> {
    return await this.userService.getOneUser(id)
  }

  @Delete(':id')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOkResponse({ description: 'user deleted' })
  async deleteOneUser(
    @Param('id') id: string,
  ): Promise<ViewUserDto> {
    return this.userService.deleteOneUser(id)
  }
}
