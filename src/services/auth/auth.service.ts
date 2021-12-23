import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service';
import { Response } from 'express';
import { ConfigService } from '../../config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneForAuth(username)
    
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user
      return result
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user._doc.username, userId: user._doc._id.toString() };
    
    const access_token = this.jwtService.sign(
      payload, 
      {
        secret: this.configService.jwtAccessSecret,
        expiresIn: this.configService.jwtAccessExpiresIn,
      }
    )

    const refresh_token = this.jwtService.sign(
      payload,
      {
        secret: this.configService.jwtRefreshSecret,
        expiresIn: this.configService.jwtRefreshExpiresIn,
      }
    )

    return { access_token, refresh_token };
  }
}