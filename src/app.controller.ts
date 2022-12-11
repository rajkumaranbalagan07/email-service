import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { AppService } from "./app.service";
import * as os from "os";
import {
  HttpResponse,
  TransformInterceptor,
} from "./lib/transform.interceptor";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller()
@UseInterceptors(new TransformInterceptor())
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiResponse({
    status: 200,
    description: "Gets the health information of the service",
  })
  @ApiResponse({
    status: 500,
    description: "Unable to reach the service",
  })
  @ApiTags("Miscellaneous")
  @ApiOperation({
    summary: "Retruns the server health information.",
  })
  @Get("/communication/healthcheck")
  getHealthCheck(): HealthCheckResponse {
    return {
      message: this.appService.getHello(),
      result: {
        uptime: os.uptime(),
        timestamp: Date.now(),
        state: "Healthy",
      },
    };
  }
}

interface HealthCheckResponse extends HttpResponse {
  result: {
    uptime: number;
    timestamp: number;
    state: string;
  };
}
