import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../../schemas/user.schema';
import { UserDto } from '../../resources/user.dto';
import { ViewUserDto } from '../../resources/view-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '../../../config';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

  constructor(
    private configService: ConfigService,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  async createUser(
    createUser: UserDto,
  ): Promise<ViewUserDto> {
    const dateNow = new Date()
    this.logger.log('creating user...')
    const hash = await bcrypt.hash(createUser.password, this.configService.saltRounds);
    return await new this.userModel({ ...createUser, password: hash, createdAt: dateNow, updatedAt: dateNow }).save()
  }

  async getUsers(): Promise<ViewUserDto[]> {
    this.logger.log('getting all users...')
    return await this.userModel.find()
  }

  async getOneUser(id: string): Promise<ViewUserDto> {
    this.logger.log(`getting one user with id: ${id}...`)
    return await this.userModel.findById(id)
  }

  async deleteOneUser(id: string): Promise<ViewUserDto> {
    this.logger.log(`deleting one user with id: ${id}...`)
    return await this.userModel.findByIdAndDelete(id)
  }
}
