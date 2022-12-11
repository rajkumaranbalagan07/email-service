import { Injectable } from "@nestjs/common";
import { AppLogger } from "../lib/logger/logger";
import { SendEmailDto } from "./dto/sendEmail.dto";
import * as dotenv from "dotenv";
import { EmailServiceFactory } from "./helper/email.helper";
dotenv.config();

@Injectable()
export class EmailService {
  private noOfRetrys;
  private servicesFailoverOrder;
  constructor() // @InjectRepository(AuditLog)
  // private auditLogRepository?: Repository<AuditLog>, // Used to store the audit logs of the email
  {
    this.noOfRetrys = 2;
    this.servicesFailoverOrder = ["sendgrid", "mailgun"];
  }
  private readonly logger = new AppLogger();

  async sendEmail(sendEmailDto: SendEmailDto): Promise<any> {
    this.logger.log("Start: CommunicationService.sendEmail");
    let retryTimesIndex = 1;
    let providerIndex = 0;

    return new Promise((resolve, reject) => {
      const failOverHandler = (e) => {
        this.logger.log(
          `Failover providerIndex ${providerIndex}, retryTimesIndex: ${retryTimesIndex}, error: ${e.message}`
        );
        ++providerIndex;
        if (providerIndex > this.servicesFailoverOrder.length - 1) {
          providerIndex = 0;
          ++retryTimesIndex;
        }

        if (retryTimesIndex > this.noOfRetrys) {
          let message = "Mail Services are not available";
          reject(message);
        }
        this.sendViaService(
          this.servicesFailoverOrder[providerIndex],
          sendEmailDto
        )
          .then(resolve)
          .catch(failOverHandler);
      };
      
      this.sendViaService(
        this.servicesFailoverOrder[providerIndex],
        sendEmailDto
      )
        .then(resolve)
        .catch(failOverHandler);
      this.logger.log("End: CommunicationService.sendEmail");
    });
  }

  async sendViaService(serviceName, sendEmailDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.logger.log(`Sending via ${serviceName}...`);
      let Service = EmailServiceFactory.getEmailService(serviceName);
      Service.sendEmail(
        sendEmailDto
        /**
         * TODO : this.auditLogRepository
         */
      )
        .then((s) => {
          this.logger.log("Emails was successfully sent");
          resolve({
            status: 200,
            message: "Mail Sent Successfully",
          });
        })
        .catch((e) => {
          this.logger.log(`Fail to send via ${serviceName}`);
          reject(e);
        });
    });
  }
}
