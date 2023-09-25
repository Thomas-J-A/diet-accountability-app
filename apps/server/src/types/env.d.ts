// Declaration merge of project-specific env types I expect
// to receive from Docker compose (dev) or PaaS runner (prod)
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      MONGODB_URI: string;
    }
  }
}

// Ensure this file becomes a module
export {};
