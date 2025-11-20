import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL, DEBUG_MODE, MODEL_TOP_K, MODEL_TOP_P, MODEL_REPEAT_PENALTY, MODEL_TEMPERATURE, MODEL_MAX_TOKENS, MODEL_NAME } from '../config/constants.js';
import { ChatMessage, ToolDefinition, APIResponse } from '../types/index.js';

function debugLog(category: string, data: any): void {
  if (DEBUG_MODE) {
    console.log(`\n🐛 DEBUG [${category}]:`);
    console.log(JSON.stringify(data, null, 2));
    console.log('─'.repeat(50));
  }
}

export async function makeAPIRequest(messages: ChatMessage[], tools: ToolDefinition[], abortSignal?: AbortSignal): Promise<ChatMessage> {
  const cleanMessages = messages.filter(msg =>
    msg.content && msg.content.trim() !== '' &&
    ['system', 'user', 'assistant', 'tool'].includes(msg.role)
  );

  debugLog('MESSAGE_HISTORY', {
    totalMessages: messages.length,
    cleanMessages: cleanMessages.length,
    lastFewMessages: cleanMessages.slice(-3)
  });

  const requestBody = {
    model: MODEL_NAME,
    messages: cleanMessages,
    max_tokens: MODEL_MAX_TOKENS,
    temperature: MODEL_TEMPERATURE,
    top_k: MODEL_TOP_K,
    top_p: MODEL_TOP_P,
    repeat_penalty: MODEL_REPEAT_PENALTY,
    stream: false,
    tools: tools,
    tool_choice: 'auto'
  };



  debugLog('API_REQUEST', {
    url: `${API_BASE_URL}/v1/chat/completions`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: requestBody
  });

  const config: any = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (abortSignal) {
    config.signal = abortSignal;
  }

  const response: AxiosResponse<APIResponse> = await axios.post(`${API_BASE_URL}/v1/chat/completions`, requestBody, config);

  debugLog('API_RESPONSE', {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    data: response.data
  });

  return response.data.choices[0].message;
}

export async function testConnection(): Promise<AxiosResponse> {
  return await axios.get(`${API_BASE_URL}/v1/models`, { timeout: 5000 });
}
