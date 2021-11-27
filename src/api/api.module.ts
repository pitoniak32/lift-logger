import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { LiftLogRoot, LiftLogRootSchema } from '../schemas/lift-log.schema'
import { AppController } from './controllers/app.controller'
import { AppService } from './services/app.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LiftLogRoot.name, schema: LiftLogRootSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class ApiModule {}
