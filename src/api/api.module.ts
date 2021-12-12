import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from '../services/auth/auth.module'
import { LiftLog, LiftLogSchema } from '../schemas/lift-log.schema'
import { LiftRoot, LiftRootSchema } from '../schemas/lift-root.schema'
import { UserModule } from '../services/user/user.module'
import { UserController } from './controllers/user/user.controller'
import { LiftLogController } from './controllers/lift-log/lift-log.controller'
import { LiftRootController } from './controllers/lift-root/lift-root.controller'
import { LiftLogService } from './services/lift-log/lift-log.service'
import { LiftRootService } from './services/lift-root/lift-root.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LiftRoot.name, schema: LiftRootSchema },
      { name: LiftLog.name, schema: LiftLogSchema },
    ]),
    AuthModule,
    UserModule,
  ],
  controllers: [
    LiftRootController,
    LiftLogController,
    UserController,
  ],
  providers: [
    LiftRootService,
    LiftLogService
  ],
})
export class ApiModule {}
