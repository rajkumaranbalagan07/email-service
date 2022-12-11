import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { AuditLog } from "./entities/auditlog.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { EmailController } from "./email.controller";
import { EmailService } from "./email.service";
@Module({
  imports: [
    HttpModule,
    // TypeOrmModule.forFeature([AuditLog]), // TODO Import Table Here
    ConfigModule,
  ],
  controllers: [EmailController],
  providers: [EmailService],
  // exports: [EmailController],
})
export class CommunicationModule {}
