import * as Joi from 'joi';

export const envSchema = Joi.object({
  // database setup
  PG_USERNAME: Joi.string().required(),
  PG_PASSWORD: Joi.string().required(),
  PG_HOST: Joi.string().required(),
  PG_DB: Joi.string().required(),
  PG_PORT: Joi.number().required(),

  //jwt setup
  JWT_SECRET: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.optional().default('non-secure-secret-key'),
  }),
  JWT_EXPIRES_IN: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.optional().default('5m'),
  }),
  REFRESH_JWT_SECRET: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.optional().default('non-secure-secret-key-2'),
  }),
  REFRESH_JWT_EXPIRES_IN: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.optional().default('182d'),
  }),
});
