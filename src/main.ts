import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // TODO: Use better logger.
  // TODO: Add logs for debugging error and info.
  await app.listen(3000)
}
bootstrap()
