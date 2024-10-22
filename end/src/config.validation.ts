// src/config.validation.ts
import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  POSTGRES_HOST: Joi.string().default('localhost'),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_USERNAME: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DATABASE: Joi.string().required(),
  NODE_ENV: Joi.string().valid('development', 'production').default('development'),
  PORT: Joi.number().default(3001),
  FRONTEND_URL: Joi.string().default('http://localhost:3000'),
  JWT_SECRET: Joi.string().required(),
}).unknown(); // Allow additional properties

export const validateConfig = (config: Record<string, any>) => {
  const { error } = configValidationSchema.validate(config);
  if (error) {
    throw new Error(`Configuration validation error: ${error.message}`);
  }
  return config; // Return the validated configuration
};
