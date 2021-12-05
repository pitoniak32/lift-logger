import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ApiModule } from './api/api.module'
import { ConfigModule, ConfigService } from './config'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
    ApiModule,
  ],
})
export class AppModule {}
