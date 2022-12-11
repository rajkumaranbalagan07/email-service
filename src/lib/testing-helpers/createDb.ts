import { createConnection } from "typeorm";
import { ConfigService } from "@nestjs/config";

export async function createMemDB(configService: ConfigService) {
  return createConnection({
    type: "mssql",
    host: configService.get("DATABASE_HOST"),
    port: +configService.get<number>("DB_PORT"),
    username: configService.get("DB_USERNAME"),
    password: configService.get("DB_PASSWORD"),
    database: configService.get("DB_NAME"),
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    schema: configService.get("DB_SCHEMA_NAME"),
    maxQueryExecutionTime: 1000,
    logging: "all",
    synchronize: false,
    options: {
      encrypt: true,
    },
    pool: {
      min: 10,
      max: 100,
      idleTimeoutMillis: 30000,
      acquireTimeoutMillis: 10000,
    },
  });
}
