import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '../../../config'
import { Request } from 'express'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies['jibs']
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.jwtRefreshSecret,
      passReqToCallback: true,
    })
  }

  async validate(request: Request, payload: any) {
    const signing_payload = { username: '', userId: '' }

    const access_token = this.authService.signAccessToken(signing_payload)
    const refresh_token = this.authService.signRefreshToken(signing_payload)

    this.authService.putRefreshInCookie(request.res, refresh_token)

    return {
      access_token,
    }
  }
}
