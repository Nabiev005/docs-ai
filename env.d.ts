/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  // башка environment variables болсо мында кошсо болот
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
