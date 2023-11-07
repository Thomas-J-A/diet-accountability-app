/// <reference types="vite/client" />

// Add IntelliSense for custom environment variables
interface ImportMetaEnv {
  readonly VITE_API_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
