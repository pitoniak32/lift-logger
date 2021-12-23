import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../../config';
import { Request } from 'express';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request.cookies['jib']
      }]),
      ignoreExpiration: false,
      secretOrKey: configService.jwtAccessSecret,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}