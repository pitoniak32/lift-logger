import { Global } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { Module } from '@nestjs/common';

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}