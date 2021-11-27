import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateLiftLogDto } from '../resources/create-lift-log.dto';
import { AppService } from '../services/app.service';

@Controller('v1/lift-logs')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  @ApiCreatedResponse({description: 'lift log created', type: String})
  @ApiBadRequestResponse({status: 400, description: 'Invalid request body.'})
  @HttpCode(HttpStatus.CREATED)
  async createLiftLog(@Body() createLiftLog: CreateLiftLogDto): Promise<string> {
    return await this.appService.createLiftLog(createLiftLog)
  }

  @Get()
  @ApiOkResponse({ description: 'lift logs found' })
  @ApiNotFoundResponse({ description: 'lift logs not found' })
  @HttpCode(HttpStatus.OK)
  async getLiftLogs() {
    return await this.appService.getLiftLogs()
  }

  @Get(':title')
  @ApiOkResponse({ description: 'lift log(s) found' })
  @ApiNotFoundResponse({ description: 'lift log(s) not found' })
  @HttpCode(HttpStatus.OK)
  async getOneLiftLog(@Param('title') title: string) {
    return this.appService.getOneLiftLog(title)
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'lift log deleted' })
  async deleteOneLiftLog(@Param('id') id: string) {
    return this.appService.deleteLiftLog(id)
  }
}
