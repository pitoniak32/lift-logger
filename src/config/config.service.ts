import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose'
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt'

export class ConfigService implements MongooseOptionsFactory, JwtOptionsFactory {
  get saltRounds() {
    return 10
  }

  get jwtSecret() {
    return 'testing-secret'
  }

  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      secret: this.jwtSecret,
      signOptions: { expiresIn: '1 day' },
    }
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
