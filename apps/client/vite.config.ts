import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Allows server to receive requests when Dockerized
    host: '0.0.0.0',
  },
});
