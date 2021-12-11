import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ApiModule } from './api/api.module'
import { ConfigModule, ConfigService } from './config'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
    ApiModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
