import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Env variables aren't loaded when this config is parsed
  // so must use this helper function to access them
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      // Allows server to receive requests when Dockerized
      host: '0.0.0.0',
      proxy: {
        '/graphql': {
          target: env.VITE_API_URI,
        },
      },
    },
  };
});
