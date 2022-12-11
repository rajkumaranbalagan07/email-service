import * as winston from "winston";
import { Injectable, LoggerService, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transports = [new winston.transports.Console()];

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger implements LoggerService {
  private readonly configService = new ConfigService();

  log(...message: any) {
    return Logger.info(
      typeof message == "object" ? JSON.stringify(message) : message
    );
  }
  error(...message: any) {
    return Logger.error(
      typeof message == "object" ? JSON.stringify(message) : message
    );
  }
  warn(message: any) {
    return Logger.warn(
      typeof message == "object" ? JSON.stringify(message) : message
    );
  }
  debug(...message: any) {
    if (this.configService.get("DEBUG_LOG") == "true") {
      return Logger.debug(
        typeof message == "object" ? JSON.stringify(message) : message
      );
    }
  }
  http(message: string) {
    return Logger.http(message);
  }
}
