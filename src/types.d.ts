// Module declarations for packages without type definitions
declare module 'file-saver' {
  export function saveAs(data: Blob | File | string, filename?: string, options?: { autoBom?: boolean }): void;
}

declare module 'pdfjs-dist/build/pdf.worker.mjs?url' {
  const workerUrl: string;
  export default workerUrl;
}

declare module 'pdfjs-dist/build/pdf.worker.min.mjs?url' {
  const workerUrl: string;
  export default workerUrl;
}

// Augment ImportMeta for Vite env (fallback if vite/client not resolving)
interface ImportMeta {
  readonly env: Record<string, string | undefined> & {
    readonly VITE_SUPABASE_URL?: string;
    readonly VITE_SUPABASE_ANON_KEY?: string;
    readonly VITE_GEMINI_API_KEY?: string;
    readonly VITE_OPENAI_API_KEY?: string;
    readonly VITE_REPLICATE_API_TOKEN?: string;
    readonly DEV?: boolean;
    readonly PROD?: boolean;
    readonly MODE?: string;
  };
}
