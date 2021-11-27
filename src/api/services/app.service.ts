import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { LiftLogRoot, LiftLogRootDocument } from '../../schemas/lift-log.schema'
import {
  CreateLiftLogRootDto,
  UpdateLiftLogRootDto,
} from '../resources/create-lift-log-root.dto'

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name)

  constructor(
    @InjectModel(LiftLogRoot.name)
    private liftLogModel: Model<LiftLogRootDocument>,
  ) {}

  async createRootLiftLog(
    createLiftLogRoot: CreateLiftLogRootDto,
  ): Promise<LiftLogRootDocument> {
    return await new this.liftLogModel(createLiftLogRoot).save()
  }

  async getRootLiftLogs(): Promise<LiftLogRootDocument[]> {
    this.logger.log('getting all root lift logs...')
    return await this.liftLogModel.find()
  }

  async getOneRootLiftLog(id: string): Promise<LiftLogRootDocument> {
    this.logger.log(`getting one root lift log with id: ${id}...`)
    return await this.liftLogModel.findById(id)
  }

  async deleteOneRootLiftLog(id: string): Promise<LiftLogRootDocument> {
    this.logger.log(`deleting one root lift log with id: ${id}...`)
    return await this.liftLogModel.findByIdAndDelete(id)
  }

  async updateOneRootLiftLog(
    id: string,
    updateLiftLogRoot: UpdateLiftLogRootDto,
  ) {
    this.logger.log(`updating one root lift log with id: ${id}...`)
    return await this.liftLogModel
      .findByIdAndUpdate(id, updateLiftLogRoot)
      .clone()
  }
}
