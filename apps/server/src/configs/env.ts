import { cleanEnv, str, port } from 'envalid';

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
  PORT: port({ default: 3000 }),
  MONGODB_URI: str(),
  ACCESS_TOKEN_SECRET: str(),
});

export default env;
