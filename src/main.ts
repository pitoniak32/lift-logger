import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Lift Logs')
    .setDescription('Api to track lifting logs')
    .setVersion('1.0')
    .addTag('lift-logs')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(new ValidationPipe())

  // TODO: Use better logger.
  // TODO: Add logs for debugging error and info.
  await app.listen(3000)
}
bootstrap()
