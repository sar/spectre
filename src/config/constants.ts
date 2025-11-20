export const API_BASE_URL: string = process.env.LLAMA_HOST_URI || 'http://localhost:8080';
export const CONTEXT_LIMIT: number = parseInt(process.env.LLAMA_CONTEXT_LIMIT || '65535', 10);
export const DEBUG_MODE: boolean = Boolean(process.env.DEBUG);

// Model configuration parameters
export const MODEL_TOP_K: number = parseInt(process.env.MODEL_TOP_K || '20', 10);
export const MODEL_TOP_P: number = parseFloat(process.env.MODEL_TOP_P || '0.8');
export const MODEL_REPEAT_PENALTY: number = parseFloat(process.env.MODEL_REPEAT_PENALTY || '1.05');
export const MODEL_TEMPERATURE: number = parseFloat(process.env.MODEL_TEMPERATURE || '0.7');
export const MODEL_MAX_TOKENS: number = parseInt(process.env.MODEL_MAX_TOKENS || '2048', 10);
export const MODEL_NAME: string = process.env.MODEL_NAME || 'qwen3-coder-30b-a3b';

