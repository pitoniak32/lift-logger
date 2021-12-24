import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose'
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt'

export class ConfigService implements MongooseOptionsFactory, JwtOptionsFactory {
  get saltRounds() {
    return 10
  }

  get jwtAccessSecret() {
    return process.env.JWT_ACCESS_SECRET || 'testing-access-secret'
  }
  
  get jwtAccessExpiresIn() {
    return process.env.JWT_ACCESS_EXPIRES_IN || '10s' 
  }

  get jwtRefreshSecret() {
    return process.env.JWT_REFRESH_SECRET || 'testing-refresh-secret'
  }

  get jwtRefreshExpiresIn() {
    return process.env.JWT_REFRESH_EXPIRES_IN || '10m' 
  }
  
  get refreshTokenKey() {
    return process.env.REFRESH_TOKEN_KEY || 'jibs'
  }

  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return { }
  }
  
  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {

    return {
      uri: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.9lce6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  }

  
}
