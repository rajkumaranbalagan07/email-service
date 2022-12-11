import { SendEmailDto } from "../dto/sendEmail.dto";
import * as mailgun from "mailgun-js";
import * as sendGridMail from "@sendgrid/mail";
import { HttpStatus } from "@nestjs/common";
import { AuditLog } from "../entities/auditlog.entity";
import { Repository } from "typeorm";
import { AppLogger } from "../../lib/logger/logger";

interface Email {
  sendEmail(sendEmailDto: SendEmailDto);
}
export class MailGunProvider implements Email {
  
  async sendEmail(
    sendEmailDto: SendEmailDto
    // auditLogRepository?: Repository<AuditLog>
  ): Promise<any> {
    let logger = new AppLogger();    
    logger.log("Start: MailGunProvider.sendEmail",sendEmailDto);
    let data = {
      from: sendEmailDto.from,
      to: sendEmailDto.to[0],
      subject: sendEmailDto.subject,
      cc:sendEmailDto.cc, 
      bcc:sendEmailDto.bcc, 
      text: sendEmailDto.body,
    };
    const mg = mailgun({
      apiKey: process.env.MAIL_GUN_API_URL,
      domain: process.env.MAIL_GUN_API_DOMAIN,
    });
    return new Promise((resolve, reject) => {
      mg.messages().send(data, function (err, body) {
        if (err) {
          //TODO :
          // auditLogRepository.insert({}) // Used to unsert in the DB for the audit purposes
          logger.error("Error: MailGunProvider.sendEmail", err);
          reject(err);
        } else {
          logger.log("End: MailGunProvider.sendEmail", body);
          //TODO :
          // auditLogRepository.insert({}) // Used to unsert in the DB for the audit purposes
          resolve({
            message: "Mail Send successfully",
            status: HttpStatus.OK,
          });
        }
      });
    });
  }
}

export class SendGridProvider implements Email {
  private readonly logger = new AppLogger();
  async sendEmail(
    sendEmailDto: SendEmailDto
    // auditLogRepository?: Repository<AuditLog>
  ): Promise<any> {
    let logger = new AppLogger();
    sendGridMail.setApiKey(process.env.SEND_GRID_API_KEY);
    logger.log("Start: SendGridProvider:sendEmail");
    const msg = {
      to: sendEmailDto.to,
      from: sendEmailDto.from,
      subject: sendEmailDto.subject,
      text: sendEmailDto.body,
      html: sendEmailDto.body,
      cc: sendEmailDto.cc,
      bcc: sendEmailDto.bcc,
    };
    return new Promise((resolve, reject) => {
      sendGridMail
        .send(msg)
        .then((res) => {
          logger.log("End: SendGridProvider.sendEmail");
          //TODO :
          // auditLogRepository.insert({}) // Used to unsert in the DB for the audit purposes
          resolve({
            message: "Mail Send successfully",
            status: HttpStatus.OK,
          });
        })
        .catch((error) => {
          this.logger.log(`Error: SendGridProvider:sendEmail:`, error);
          //TODO :
          // auditLogRepository.insert({}) // Used to unsert in the DB for the audit purposes
          reject(error);
        });
    });
  }
}

export class EmailServiceFactory {
  static getEmailService(provider) {
    if (provider === "mailgun") {
      return new MailGunProvider();
    } else if (provider === "sendgrid") {
      return new SendGridProvider();
    } else {
      throw new Error(`Invalid provider: ${provider}`);
    }
  }
}
