import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { Response } from 'express'
import { ConfigService } from '../../config'

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
    response: Response,
  ): Promise<any> {
    let access_token = ''
    let refresh_token = ''
    const user = await this.userService.findOneForAuth(username)

    if (user && (await bcrypt.compare(pass, user.password))) {
      const payload = { username: user.username, userId: user._id }

      access_token = this.signAccessToken(payload)
      refresh_token = this.signRefreshToken(payload)

      this.putRefreshInCookie(response, refresh_token)
    }

    return { access_token }
  }

  signAccessToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: this.configService.jwtAccessSecret,
      expiresIn: this.configService.jwtAccessExpiresIn,
    })
  }

  signRefreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: this.configService.jwtRefreshSecret,
      expiresIn: this.configService.jwtRefreshExpiresIn,
    })
  }

  putRefreshInCookie(response: Response, token: string) {
    response.cookie(this.configService.refreshTokenKey, token)
  }
}
