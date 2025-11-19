import fs from 'fs';
import path from 'path';
import { ChatMessage } from '../types/index.js';

export function saveChatHistory(chatMessages: ChatMessage[], conversationId?: string): string {
  // Create .spectre directory if it doesn't exist
  const spectreDir = path.join(process.cwd(), '.spectre');
  try {
    if (!fs.existsSync(spectreDir)) {
      fs.mkdirSync(spectreDir, { recursive: true });
    }
  } catch (error) {
    console.error('Error creating .spectre directory:', error);
    throw error;
  }

  // Generate timestamp for filename
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-');
  const formattedTimestamp = timestamp.substring(0, 18); // YYMMDD_HHMMSS

  // Use provided conversationId or generate a new one
  const filename = conversationId ? `${conversationId}_${formattedTimestamp}.txt` : `chat_${formattedTimestamp}.txt`;
  const filePath = path.join(spectreDir, filename);

  // Format the chat history
  let content = '';
  chatMessages.forEach(msg => {
    if (msg.role === 'user') {
      content += `User: ${msg.content}\n\n`;
    } else if (msg.role === 'assistant') {
      content += `Assistant: ${msg.content}\n\n`;
    } else if (msg.role === 'tool') {
      content += `Tool Call: ${msg.content}\n\n`;
    }
  });

  // Write to file
  fs.writeFileSync(filePath, content);

  return filePath;
}

export function createNewConversation(): string {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-');
  const formattedTimestamp = timestamp.substring(0, 18); // YYMMDD_HHMMSS
  return `conversation_${formattedTimestamp}`;
}
