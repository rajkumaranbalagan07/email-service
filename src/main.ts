import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import { httpLogger } from "./lib/logger/http.logger";
import { transformBadrequst } from "./lib/helpers/badRequestFactoryFunc";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix("/api/email/v1");
  app.use(httpLogger);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: false,
      stopAtFirstError: true,
      exceptionFactory: transformBadrequst,
    })
  );

  await app.listen(2014, "0.0.0.0");
  console.log(`Application run on: ${await app.getUrl()}`);
}
bootstrap();
