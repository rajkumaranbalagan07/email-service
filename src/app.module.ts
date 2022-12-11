import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CommunicationModule } from "./email/email.module";
import { envValidation } from "./config/validateENV";

@Module({
  imports: [
    CommunicationModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
      validationSchema: envValidation,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get('DATABASE_HOST'),
    //     port: +configService.get<number>('DB_PORT'),
    //     username: configService.get('DB_USERNAME'),
    //     password: configService.get('DB_PASSWORD'),
    //     database: configService.get('DB_NAME'),
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     schema: configService.get('DB_SCHEMA_NAME'),
    //     maxQueryExecutionTime: 1000,
    //     logging: configService.get('QUREY_LOG'),
    //     synchronize: false ,
    //     ssl: true,
    //     options: {
    //       encrypt: false,
    //       enableArithAbort: true,
    //       useUTC: true,
    //     },
    //     pool: {
    //       min: 10,
    //       max: 100,
    //       idleTimeoutMillis: 30000,
    //       acquireTimeoutMillis: 10000,
    //     },
    //     autoLoadEntities: true,
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
