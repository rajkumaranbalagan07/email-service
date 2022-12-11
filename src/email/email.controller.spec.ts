import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import { MAGICNUMBERS } from "../constants/appConstants";
import { HttpModule } from "@nestjs/axios";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AuditLog } from "./entities/auditlog.entity";
import { EmailService } from "./email.service";
import { EmailController } from "./email.controller";

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    delete: jest.fn((entity) => entity),
    find: jest.fn((entity) => entity),
    update: jest.fn((entity) => entity),
  })
);

jest.useFakeTimers();
jest.setTimeout(30000);

describe("Communication Controller", () => {
  let emailService: EmailService;
  let emailController: EmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule.forRoot({
          envFilePath: ".env",
          isGlobal: true,
          validationOptions: {
            allowUnknown: true,
            abortEarly: true,
          },
        }),
      ],
      controllers: [EmailController],
      providers: [
        EmailService,
        {
          provide: getRepositoryToken(AuditLog),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    emailService = module.get<EmailService>(EmailService);
    emailController = module.get<EmailController>(EmailController);
  });

  it("SendEmail Method testing", async () => {
    const sendEmailControllerSpy = jest.spyOn(emailController, "sendEmail");
    const sendEmailServiceSpy = jest.spyOn(emailService, "sendEmail");
    sendEmailServiceSpy.mockResolvedValue(
      Promise.resolve({
        statusCode: 200,
        message: "Mail Sent Successfully",
      })
    );
    expect(
      emailController.sendEmail({
        from: "rajkumaranbu07@gmail.com",
        to: ["rajkumarajay07@gmail.com"],
        cc: ["rajkumaranbalagan07@gmail.com"],
        bcc: ["rajkumardarkmatter@gmail.com"],
        subject: "Interview Communication Service Sample",
        body: "Create a service that accepts the necessary information and sends emails. The application should provide an abstraction between 2 different email service providers. If one of the services goes down, your service can quickly failover to a different provider without affecting your customers.",
      })
    ).resolves.toEqual({
      status: 200,
      message: "Mail Sent Successfully",
      data: true,
    });
    expect(emailController).toBeDefined();
    expect(emailService).toBeDefined();
    expect(sendEmailControllerSpy).toHaveBeenCalledTimes(MAGICNUMBERS.ONE);
    expect(sendEmailServiceSpy).toHaveBeenCalledTimes(MAGICNUMBERS.ONE);
  });
});
