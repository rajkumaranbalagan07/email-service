import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";

import { SendEmailDto, SendEmailSuccessReponse } from "./dto/sendEmail.dto";
import {
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from "@nestjs/swagger";
import {
  ErrorResponse,
  ValidationErrorResponse,
} from "../lib/global-dto/responseError.dto";

import {
  CommonMessages,
  EmailApiMessages,
} from "src/constants/swaggerMessages";
import { AppLogger } from "src/lib/logger/logger";
import { EmailService } from "./email.service";

@Controller("/")
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  private readonly logger = new AppLogger();

  /**
   * Used to send Email
   * @param sendEmail
   * @returns
   */
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: SendEmailSuccessReponse,
    description: EmailApiMessages.SendEmail.API_OK_DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ValidationErrorResponse,
    description: EmailApiMessages.SendEmail.API_BAD_REQUEST,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
    description: CommonMessages.API_INTERNAL_SERVER_ERROR,
  })
  @ApiOperation({
    summary: EmailApiMessages.SendEmail.API_SUMMARY,
  })
  @ApiOkResponse()
  @Post("/sendEmail")
  async sendEmail(
    @Body() sendEmailDto: SendEmailDto
  ): Promise<SendEmailSuccessReponse> {
    this.logger.log("Start: CommunicationController.sendEmail");
    let response = await this.emailService.sendEmail(sendEmailDto);
    if (response) {
      this.logger.log("End: CommunicationController.sendEmail");
      return {
        status: 200,
        message: "Mail Sent Successfully",
        data: true,
      };
    } else {
      return {
        status: 500,
        message: "All Providers failed to send Mail",
        data: false,
      };
    }
  }
}
