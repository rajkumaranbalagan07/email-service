import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ErrorResponse } from "src/lib/global-dto/responseError.dto";
import { SuccessResponse } from "src/lib/global-dto/responseSuccess.dto";

export class SendEmailDto {
  @ApiProperty()
  @IsEmail()
  from: string;

  @ApiProperty()
  @IsEmail({}, { each: true })
  to: Array<string>;

  @ApiPropertyOptional()
  @IsEmail({}, { each: true })
  @IsOptional()
  cc?: Array<string>;

  @ApiPropertyOptional()
  @IsEmail({}, { each: true })
  @IsOptional()
  bcc?: Array<string>;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  body: string;

  @ApiProperty()
  @IsString()
  subject: string;
}

export class SendEmailSuccessReponse extends SuccessResponse {
  @ApiProperty()
  @IsNotEmpty()
  data: any;
}

export class SendEmailErrorResponse extends ErrorResponse {
  @ApiProperty()
  @IsNotEmpty()
  data: any;
}
