import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ApiModule } from './api/api.module'
import { ConfigModule, ConfigService } from './config'
import { AuthModule } from './services/auth/auth.module';
import { UserModule } from './services/user/user.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
    ApiModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
})
export class AppModule {}
