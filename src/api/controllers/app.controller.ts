import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { doc } from 'prettier';
import { title } from 'process';
import { CreateLiftLogDto } from '../resources/create-lift-log.dto';
import { ViewLiftLogDto } from '../resources/view-lift-log.dto';
import { AppService } from '../services/app.service';

@Controller('v1/lift-logs')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  @ApiCreatedResponse({description: 'lift log created', type: String})
  @ApiBadRequestResponse({status: 400, description: 'Invalid request body.'})
  @HttpCode(HttpStatus.CREATED)
  async createLiftLog(@Body() createLiftLog: CreateLiftLogDto): Promise<ViewLiftLogDto> {
    return await this.appService.createLiftLog(createLiftLog)
  }

  @Get()
  @ApiOkResponse({ description: 'lift logs found' })
  @ApiNotFoundResponse({ description: 'lift logs not found' })
  @HttpCode(HttpStatus.OK)
  async getLiftLogs(): Promise<ViewLiftLogDto[]>{
    return await this.appService.getLiftLogs()
  }

  @Get(':id')
  @ApiOkResponse({ description: 'lift log found' })
  @ApiNotFoundResponse({ description: 'lift log not found' })
  @HttpCode(HttpStatus.OK)
  async getOneLiftLog(@Param('id') id: string): Promise<ViewLiftLogDto> {
    return await this.appService.getOneLiftLog(id)
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'lift log deleted' })
  async deleteOneLiftLog(@Param('id') id: string): Promise<ViewLiftLogDto> {
    return this.appService.deleteOneLiftLog(id)
  }
}
