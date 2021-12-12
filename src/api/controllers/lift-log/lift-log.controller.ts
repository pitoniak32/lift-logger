import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { JwtAuthGuard } from '../../../services/auth/guards/jwt-auth.guard'
import { LiftLogDto } from '../../resources/lift-log.dto'
import { ViewLiftLogDto } from '../../resources/view-lift-log.dto'
import { LiftLogService } from '../../services/lift-log/lift-log.service'

@Controller('v1/lift-log')
@ApiTags('lift-log')
export class LiftLogController {
  constructor(private readonly liftLogService: LiftLogService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'lift log log created', type: String })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid request body.' })
  @HttpCode(HttpStatus.CREATED)
  async createLiftLog(
    @Body() createLiftLog: LiftLogDto,
  ): Promise<ViewLiftLogDto> {
    return await this.liftLogService.createLiftLog(createLiftLog)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'lift logs found' })
  @ApiNotFoundResponse({ description: 'lift logs not found' })
  @HttpCode(HttpStatus.OK)
  async getLiftLogs(): Promise<ViewLiftLogDto[]> {
    return await this.liftLogService.getLiftLogs()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'lift log found' })
  @ApiNotFoundResponse({ description: 'lift log not found' })
  @HttpCode(HttpStatus.OK)
  async getOneLiftLog(@Param('id') id: string): Promise<ViewLiftLogDto> {
    return await this.liftLogService.getOneLiftLog(id)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'lift log deleted' })
  async deleteOneLiftLog(
    @Param('id') id: string,
  ): Promise<ViewLiftLogDto> {
    return this.liftLogService.deleteOneLiftLog(id)
  }
}
