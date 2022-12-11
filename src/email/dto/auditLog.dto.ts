import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

import { NotificationType, NotificationStatus } from "../../lib/enums/enums";
import { ErrorResponse } from "src/lib/global-dto/responseError.dto";
import { SuccessResponse } from "src/lib/global-dto/responseSuccess.dto";

export class GetAuditLogs {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  applicationClientId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  templateId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsEnum(NotificationType, {
    message:
      "notificationType must be a valid enum value , EMAIL, SMS, PUSHNOTIFICATION",
  })
  notificationType?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  providerName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsEnum(NotificationStatus, {
    message: "status must be a valid enum value , SUCCESS, PENDING, FAILED",
  })
  status?: string;
}

export class AuditLogData {
  @ApiProperty()
  @IsNumber()
  id?: number;

  @ApiProperty()
  @IsString()
  notificationType?: string;

  @ApiProperty()
  @IsString()
  providerName?: string;

  @ApiProperty()
  @IsString()
  sentBy?: string;

  @ApiProperty()
  @IsString()
  emailCC?: string;

  @ApiProperty()
  @IsString()
  emailAttachments?: string;

  @ApiProperty()
  @IsString()
  sentTo?: string;

  @ApiProperty()
  @IsString()
  createdAt?: string;

  @ApiProperty()
  @IsString()
  templateId?: string;

  @ApiProperty()
  @IsString()
  status?: string;

  @ApiProperty()
  @IsString()
  error?: string;

  @ApiProperty()
  @IsString()
  applicationClientId?: string;
}

export class GetAuditlogSuccessResponse extends SuccessResponse {
  @ApiProperty({ type: [AuditLogData] })
  @IsNotEmpty()
  data: Array<AuditLogData>;
}

export class GetAuditLogErrorResponse extends ErrorResponse {
  @ApiProperty()
  @IsNotEmpty()
  data: any;
}
