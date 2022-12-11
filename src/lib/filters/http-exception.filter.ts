import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";
import { ResponseCodes } from "../../constants/responseCodes";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse();

    response.status(status).json({
      status: status,
      code: ResponseCodes.HTTP_ERROR,
      message: (<any>error).message,
      error: (<any>error).error,
    });
  }
}
