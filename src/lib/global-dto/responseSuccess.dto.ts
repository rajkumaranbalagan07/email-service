import { ApiProperty } from "@nestjs/swagger";

export class SuccessResponse {
  @ApiProperty()
  status: number;

  @ApiProperty()
  message: string;

  data: any;
}
