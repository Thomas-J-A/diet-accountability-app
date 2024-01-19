// Declaration merge of project-specific env types I expect
// to receive from Docker compose (dev) or PaaS runner (prod)
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'dev' | 'production' | 'test' | undefined;
      PORT: string;
      ACCESS_TOKEN_SECRET: string;
      MONGODB_URI?: string;
      AWS_ACCESS_KEY_ID?: string;
      AWS_SECRET_ACCESS_KEY?: string;
      AWS_REGION?: string;
      AWS_ROLE_ARN?: string;
      AWS_BUCKET_NAME?: string;
    }
  }
}

// Ensure this file becomes a module
export {};
