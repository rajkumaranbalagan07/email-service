const SwaggerMessages = {
  Common: {
    API_UNAUTHORIZED: "Unauthorized, Wrong auth credentials",
    API_NOT_FOUND: "Resource not found.",
    API_INTERNAL_SERVER_ERROR: "Internal server error.",
  },

  Provider: {
    InserProvider: {
      API_OK_DESCRIPTION: "Service Provider Configuration",
      API_BAD_REQUEST: "Failed to Insert provider, bad request.",
      API_SUMMARY:
        "ADMIN API : Service Provider Configuration. Enter anyone object (emailProvider,smsProvider,pnProvider) at a time in req body",
    },
  },

  Template: {
    InsertTemplate: {
      API_OK_DESCRIPTION: "Insert Template",
      API_BAD_REQUEST: "Failed to Insert template, bad request.",
      API_SUMMARY:
        "Insert Template. Enter anyone object (emailTemplate,smsTemplate,pnTemplate) at a time in req body",
    },
  },

  Email: {
    SendEmail: {
      API_OK_DESCRIPTION: "Send Email",
      API_BAD_REQUEST: "Failed to send email, bad request.",
      API_SUMMARY: "Send Email",
    },
  },

  PushSubscriptionOption: {
    SendPN: {
      API_OK_DESCRIPTION: "Send Push Notification",
      API_BAD_REQUEST: "Failed to send puah Notification, bad request.",
      API_SUMMARY: `Send Push Notification (Send either userId or deviceToken or both in request body)
        Implementation of userId is in progress`,
    },
  },

  GetPNTemplate: {
    GetPNTemplate: {
      API_OK_DESCRIPTION: "Get Push Notification Template by ID",
      API_BAD_REQUEST: "Failed to get push Notification template, bad request.",
      API_SUMMARY: "Get Push Notification Template by ID",
    },
  },

  GetAuditLog: {
    GetAuditLog: {
      API_OK_DESCRIPTION: "Get Audit Log",
      API_BAD_REQUEST: "Failed to get Audit logs",
      API_SUMMARY: "Get Audit logs",
    },
  },

  GetSMSTemplate: {
    GetSMSTemplate: {
      API_OK_DESCRIPTION: "Get SMS Template by ID",
      API_BAD_REQUEST: "Failed to get SMS template, bad request.",
      API_SUMMARY: "Get SMS Template by ID",
    },
  },

  GetEmailTemplate: {
    GetEmailTemplate: {
      API_OK_DESCRIPTION: "Get Email Template by ID",
      API_BAD_REQUEST: "Failed to get Email template, bad request.",
      API_SUMMARY: "Get Email Template by ID",
    },
  },

  UpdateTemplate: {
    UpdateTemplate: {
      API_OK_DESCRIPTION: "Update Template by ID",
      API_BAD_REQUEST: "Failed to Update template, bad request.",
      API_SUMMARY:
        "Update Template by ID. Enter anyone object (emailTemplate,smsTemplate,pnTemplate) at a time in req body",
    },
  },

  DeleteTemplate: {
    DeleteTemplate: {
      API_OK_DESCRIPTION: "Delete Template by ID",
      API_BAD_REQUEST: "Failed to Delete template, bad request.",
      API_SUMMARY: "Delete Template by ID",
    },
  },

  SendPushNotificationBulk: {
    SendPushNotificationBulk: {
      API_OK_DESCRIPTION: "Push Notifications are being sent asynchronously",
      API_BAD_REQUEST: "Failed to process the request",
      API_SUMMARY:
        "Async API to Send push notification in bulk (Send atleast anyone of deviceTokens, userIds or metadata in request body)",
    },
  },

  RegisterDevice: {
    RegisterDevice: {
      API_OK_DESCRIPTION: "Device registered",
      API_BAD_REQUEST: "Failed to process the request",
      API_SUMMARY: "Register devices",
    },
  },

  AuditLogsByRequestId: {
    AuditLogsByRequestId: {
      API_OK_DESCRIPTION: "Audit Logs Fetched By transactionId",
      API_BAD_REQUEST: "Failed to process the request",
      API_SUMMARY: "Fetch Audit Logs By transactionId",
    },
  },

  SMS: {
    sendSms: {
      API_OK_DESCRIPTION: "Send SMS.",
      API_BAD_REQUEST: "Failed to send SMS.",
      API_SUMMARY: "SendSms: Used to send the SMS based on the payload sent",
    },
  },
};

const CommonMessages = SwaggerMessages.Common;
const ProviderApiMessages = SwaggerMessages.Provider;
const EmailApiMessages = SwaggerMessages.Email;
const PNApiMessages = SwaggerMessages.PushSubscriptionOption;
const SMSApiMessages = SwaggerMessages.SMS;
const TemplateApiMessages = SwaggerMessages.Template;
const GetPNTemplate = SwaggerMessages.GetPNTemplate;
const GetSMSTemplate = SwaggerMessages.GetSMSTemplate;
const GetEmailTemplate = SwaggerMessages.GetEmailTemplate;
const GetAuditLog = SwaggerMessages.GetAuditLog;
const UpdateTemplate = SwaggerMessages.UpdateTemplate;
const DeleteTemplate = SwaggerMessages.DeleteTemplate;
const SendPushNotificationBulk = SwaggerMessages.SendPushNotificationBulk;
const RegisterDevice = SwaggerMessages.RegisterDevice;
const AuditLogsByRequestId = SwaggerMessages.AuditLogsByRequestId;

export {
  CommonMessages,
  ProviderApiMessages,
  SMSApiMessages,
  EmailApiMessages,
  PNApiMessages,
  TemplateApiMessages,
  GetPNTemplate,
  GetSMSTemplate,
  GetEmailTemplate,
  GetAuditLog,
  UpdateTemplate,
  DeleteTemplate,
  SendPushNotificationBulk,
  RegisterDevice,
  AuditLogsByRequestId,
};
