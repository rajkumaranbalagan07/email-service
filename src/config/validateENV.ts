import * as Joi from "joi";

export const envValidation = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "test", "provision")
    .default("development")
    .required(),

  SEND_GRID_API_KEY: Joi.string().required(),
  MAIL_GUN_API_DOMAIN: Joi.string().required(),
  MAIL_GUN_API_URL: Joi.string().required(),
});
