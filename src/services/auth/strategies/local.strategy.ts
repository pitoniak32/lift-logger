import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { Request } from 'express'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      passReqToCallback: true,
    })
  }

  async validate(
    request: Request,
    username: string,
    password: string,
  ): Promise<any> {
    const access_token = await this.authService.validateUser(
      username,
      password,
      request.res,
    )
    if (!access_token) {
      throw new UnauthorizedException()
    }
    return access_token
  }
}
