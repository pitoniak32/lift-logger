import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { LiftLog, LiftLogSchema } from '../schemas/lift-log.schema'
import { LiftRoot, LiftRootSchema } from '../schemas/lift-root.schema'
import { User, UserSchema } from '../schemas/user.schema'
import { LiftLogController } from './controllers/lift-log/lift-log.controller'
import { LiftRootController } from './controllers/lift-root/lift-root.controller'
import { UserController } from './controllers/user/user.controller'
import { LiftLogService } from './services/lift-log/lift-log.service'
import { LiftRootService } from './services/lift-root/lift-root.service'
import { UserService } from './services/user/user.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: LiftRoot.name, schema: LiftRootSchema },
      { name: LiftLog.name, schema: LiftLogSchema },
    ]),
  ],
  controllers: [
    UserController,
    LiftRootController,
    LiftLogController
  ],
  providers: [
    UserService,
    LiftRootService,
    LiftLogService
  ],
})
export class ApiModule {}
