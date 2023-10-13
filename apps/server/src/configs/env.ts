import path from 'path';
import { config } from 'dotenv';
import { cleanEnv, str, port } from 'envalid';

// Load appropriate .env file depending on environment
// In development, Docker sets NODE_ENV in 'environment' field
// In testing, Jest sets NODE_ENV
config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['dev', 'production', 'test'] }),
  PORT: port({ default: 3000 }),
  MONGODB_URI: str(),
  ACCESS_TOKEN_SECRET: str(),
});

export default env;
