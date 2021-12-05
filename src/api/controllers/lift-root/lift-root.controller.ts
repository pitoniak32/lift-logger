import {
  Body,
  Controller,
  Delete,
  Get,
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
import { LiftRootDto } from '../../resources/lift-root.dto'
import { ViewLiftRootDto } from '../../resources/view-lift-root.dto'
import { LiftRootService } from '../../services/lift-root/lift-root.service'

@Controller('v1/lift-root')
@ApiTags('lift-root')
export class LiftRootController {
  constructor(private readonly liftRootService: LiftRootService) {}

  @Post('create')
  @ApiCreatedResponse({ description: 'lift log root created', type: String })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid request body.' })
  @HttpCode(HttpStatus.CREATED)
  async createRootLiftLog(
    @Body() createLiftRoot: LiftRootDto,
  ): Promise<ViewLiftRootDto> {
    return await this.liftRootService.createRootLift(createLiftRoot)
  }

  @Get()
  @ApiOkResponse({ description: 'lift logs found' })
  @ApiNotFoundResponse({ description: 'lift logs not found' })
  @HttpCode(HttpStatus.OK)
  async getRootLifts(): Promise<ViewLiftRootDto[]> {
    return await this.liftRootService.getRootLifts()
  }

  @Get(':id')
  @ApiOkResponse({ description: 'lift root found' })
  @ApiNotFoundResponse({ description: 'lift root not found' })
  @HttpCode(HttpStatus.OK)
  async getOneLiftRoot(@Param('id') id: string): Promise<ViewLiftRootDto> {
    return await this.liftRootService.getOneRootLift(id)
  }

  @Get('user/:id')
  @ApiOkResponse({ description: 'lift root found' })
  @ApiNotFoundResponse({ description: 'lift root not found' })
  @HttpCode(HttpStatus.OK)
  async getLiftRootsByUserId(@Param('id') id: string): Promise<ViewLiftRootDto[]> {
    return await this.liftRootService.getRootLiftsByUserId(id)
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'lift log deleted' })
  async deleteOneLiftRoot(
    @Param('id') id: string,
  ): Promise<ViewLiftRootDto> {
    return this.liftRootService.deleteOneRootLift(id)
  }
}
