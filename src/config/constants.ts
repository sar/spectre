export const API_BASE_URL: string = process.env.LLAMA_HOST_URI || 'http://localhost:8080';
export const CONTEXT_LIMIT: number = parseInt(process.env.LLAMA_CONTEXT_LIMIT || '65535', 10);
export const DEBUG_MODE: boolean = Boolean(process.env.DEBUG);