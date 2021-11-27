import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { LiftLogRootDocument } from '../../schemas/lift-log.schema'
import { CreateLiftLogGroupDto } from '../resources/create-lift-log-group.dto'
import {
  CreateLiftLogRootDto,
  UpdateLiftLogRootDto,
} from '../resources/create-lift-log-root.dto'
import { UpdateLiftLogGroupDto } from '../resources/update-lift-log-group.dto'
import { AppService } from '../services/app.service'

@Controller('v1/lift-logs')
@ApiTags('lift-logs')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create-root')
  @ApiCreatedResponse({ description: 'lift log root created', type: String })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid request body.' })
  @HttpCode(HttpStatus.CREATED)
  async createRootLiftLog(
    @Body() createLiftLogRoot: CreateLiftLogRootDto,
  ): Promise<LiftLogRootDocument> {
    return await this.appService.createRootLiftLog(createLiftLogRoot)
  }

  @Get()
  @ApiOkResponse({ description: 'lift logs found' })
  @ApiNotFoundResponse({ description: 'lift logs not found' })
  @HttpCode(HttpStatus.OK)
  async getLiftLogs(): Promise<LiftLogRootDocument[]> {
    return await this.appService.getRootLiftLogs()
  }

  @Get(':id')
  @ApiOkResponse({ description: 'lift log found' })
  @ApiNotFoundResponse({ description: 'lift log not found' })
  @HttpCode(HttpStatus.OK)
  async getOneLiftLog(@Param('id') id: string): Promise<LiftLogRootDocument> {
    return await this.appService.getOneRootLiftLog(id)
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'lift log deleted' })
  async deleteOneLiftLog(
    @Param('id') id: string,
  ): Promise<LiftLogRootDocument> {
    return this.appService.deleteOneRootLiftLog(id)
  }

  @Put(':id')
  async updateOneLiftLogGroup(
    @Param('id') id: string,
    @Body() updateLiftLogRootDto: UpdateLiftLogRootDto,
  ) {
    return this.appService.updateOneRootLiftLog(id, updateLiftLogRootDto)
  }
}
