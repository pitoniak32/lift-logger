import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { LiftLog, LiftLogSchema } from '../schemas/lift-log.schema'
import { AppController } from './controllers/app.controller'
import { AppService } from './services/app.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LiftLog.name, schema: LiftLogSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class ApiModule {}
