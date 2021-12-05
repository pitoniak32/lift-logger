import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { LiftRoot, LiftRootDocument } from '../../../schemas/lift-root.schema'
import { LiftRootDto } from '../../resources/lift-root.dto'
import { ViewLiftRootDto } from '../../resources/view-lift-root.dto'

@Injectable()
export class LiftRootService {
  private readonly logger = new Logger(LiftRootService.name)

  constructor(
    @InjectModel(LiftRoot.name)
    private liftRootModel: Model<LiftRootDocument>,
  ) {}

  async createRootLift(
    createLiftRoot: LiftRootDto,
  ): Promise<ViewLiftRootDto> {
    const dateNow = new Date()
    return await new this.liftRootModel({ ...createLiftRoot, createdAt: dateNow, updatedAt: dateNow }).save()
  }

  async getRootLifts(): Promise<ViewLiftRootDto[]> {
    this.logger.log('getting all root lifts...')
    return await this.liftRootModel.find()
  }

  async getOneRootLift(id: string): Promise<ViewLiftRootDto> {
    this.logger.log(`getting one root lift with id: ${id}...`)
    return await this.liftRootModel.findById(id)
  }

  async getRootLiftsByUserId(id: string): Promise<ViewLiftRootDto[]> {
    this.logger.log(`getting all root lifts with userId: ${id}...`)
    return await this.liftRootModel.find({ userId: id })
  }

  async deleteOneRootLift(id: string): Promise<ViewLiftRootDto> {
    this.logger.log(`deleting one root lift with id: ${id}...`)
    return await this.liftRootModel.findByIdAndDelete(id)
  }
}
