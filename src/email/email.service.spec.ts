import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import { Repository } from "typeorm";
import { MAGICNUMBERS } from "./constants";
import { AuditLog } from "./entities/auditlog.entity";
import { envValidation } from "src/config/validateENV";
import { HttpModule } from "@nestjs/axios";
import { EmailService } from "./email.service";

jest.mock("uuidv4");

jest.useFakeTimers();
jest.setTimeout(30000);

describe("Communication Service Unit Test", () => {
  const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
    () => ({
      findOne: jest.fn((entity) => entity),
      findOneBy: jest.fn((entity) => entity),
      save: jest.fn((entity) => entity),
      delete: jest.fn((entity) => entity),
      find: jest.fn((entity) => entity),
      findBy: jest.fn((entity) => entity),
      update: jest.fn((entity) => entity),
      insert: jest.fn((entity) => entity),
      getCount: jest.fn().mockReturnThis(),
    })
  );

  type MockType<T> = {
    [P in keyof T]?: jest.Mock<unknown>;
  };

  let auditLogRepositoryMock: MockType<Repository<AuditLog>>;
  let emailService: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule.forRoot({
          envFilePath: ".env",
          isGlobal: true,
          validationSchema: envValidation,
          validationOptions: {
            allowUnknown: true,
            abortEarly: true,
          },
        }),
      ],
      providers: [
        EmailService,
        {
          provide: getRepositoryToken(AuditLog),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    emailService = module.get<EmailService>(EmailService);
    auditLogRepositoryMock = module.get(getRepositoryToken(AuditLog));
  });

  it("sendEmail method testing: success response", () => {
    const sendEmailSpy = jest.spyOn(emailService, "sendEmail");
    const sendViaServiceSpy = jest.spyOn(emailService, "sendViaService");
    sendViaServiceSpy.mockResolvedValue(
      Promise.resolve({
        statusCode: 200,
        message: "Mail Sent Successfully",
      })
    );
    expect(
      emailService.sendEmail({
        from: "rajkumaranbu07@gmail.com",
        to: ["rajkumarajay07@gmail.com"],
        cc: ["rajkumaranbalagan07@gmail.com"],
        bcc: ["rajkumardarkmatter@gmail.com"],
        subject: "Interview Communication Service Sample",
        body: "Create a service that accepts the necessary information and sends emails. The application should provide an abstraction between 2 different email service providers. If one of the services goes down, your service can quickly failover to a different provider without affecting your customers.",
      })
    ).resolves.toEqual({
      statusCode: 200,
      message: "Mail Sent Successfully",
    });

    expect(emailService).toBeDefined();
    expect(sendEmailSpy).toHaveBeenCalledTimes(MAGICNUMBERS.ONE);
    expect(sendViaServiceSpy).toHaveBeenCalledTimes(MAGICNUMBERS.ONE);
  });
});
