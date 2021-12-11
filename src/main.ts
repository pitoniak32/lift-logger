import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser';

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

  app.use(cookieParser('testing-secret'));

  app.useGlobalPipes(new ValidationPipe())

  app.enableCors({ methods:['GET'] })

  await app.listen(process.env.PORT || '3000')
}
bootstrap()
