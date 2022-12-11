import { ApiProperty } from "@nestjs/swagger";

export class ErrorResponse {
  @ApiProperty()
  status: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}

export class ValidationErrorResponse {
  @ApiProperty()
  status: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
