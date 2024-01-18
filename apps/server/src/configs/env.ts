import path from 'path';
import { config } from 'dotenv';
import { cleanEnv, str, port } from 'envalid';

/**
 * Load appropriate .env file depending on environment
 * In development, Docker sets NODE_ENV in 'environment' field
 * In testing, Jest sets NODE_ENV
 * In production, hosting platform supplies all environment variables directly
 */
if (process.env.NODE_ENV !== 'production') {
  config({
    path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`),
  });
}

// Environment-specific configs for cleanEnv method
const envConfig = {
  dev: {
    NODE_ENV: str({ default: 'dev' }),
    PORT: port({ default: 3000 }),
    ACCESS_TOKEN_SECRET: str(),
    MONGODB_URI: str(),
    AWS_ACCESS_KEY_ID: str(),
    AWS_SECRET_ACCESS_KEY: str(),
    AWS_REGION: str(),
    AWS_ROLE_ARN: str(),
    AWS_BUCKET_NAME: str(),
  },
  test: {
    NODE_ENV: str({ default: 'test' }),
    PORT: port({ default: 3000 }),
    ACCESS_TOKEN_SECRET: str(),
  },
  production: {
    NODE_ENV: str({ default: 'production' }),
    PORT: port({ default: 3000 }),
    ACCESS_TOKEN_SECRET: str(),
    MONGODB_URI: str(),
  },
};

// Get the environment configuration based on NODE_ENV
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const currentEnvConfig = envConfig[process.env.NODE_ENV];

// Sanitize and type-check environment variables
const env = cleanEnv(process.env, currentEnvConfig);

export default env;
