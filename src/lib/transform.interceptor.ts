import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ResponseCodes } from "../constants/responseCodes";

export interface IResponse {
  status: number;
  message: string;
  code: string;
  data: any;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, IResponse> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<IResponse> {
    return next.handle().pipe(
      map((data) => ({
        status: context.switchToHttp().getResponse().statusCode,
        message: data.message,
        code: data.code ? data.code : ResponseCodes.HTTP_ERROR,
        data: data.result,
      }))
    );
  }
}

export interface HttpResponse {
  message: string;
  result: any;
}
