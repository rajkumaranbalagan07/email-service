import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("AUDIT_LOG")
export class AuditLog {
  @PrimaryGeneratedColumn({ name: "AUDIT_LOG_D" })
  id: string;

  @Column({ name: "AUDIT_LOG_TRANSACTION_ID", type: "varchar" })
  transactionId: string;

  @Column({ name: "PROVIDER_NAME", type: "varchar", nullable: true })
  providerName: string;

  @Column({ name: "SENT_BY", type: "varchar" })
  sentBy: string;

  @Column({ name: "EMAIL_CC", type: "varchar" })
  emailCC: Array<string>;

  @Column({ name: "SENT_TO", type: "varchar" })
  sentTo: Array<string>;

  @CreateDateColumn({ name: "CREATED_AT" })
  createdAt: Date;

  @UpdateDateColumn({ name: "UPDATED_AT", nullable: true })
  updatedAt: Date;

  @Column({ name: "STATUS", type: "varchar" })
  status: string;

  @Column({ name: "ERROR", type: "varchar", nullable: true })
  error: string;

  @Column({ name: "APPLICATION_CLIENT_ID", type: "varchar" })
  applicationClientId: string;
}
