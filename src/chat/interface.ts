import colors from 'yoctocolors-cjs';
import { DEBUG_MODE, API_BASE_URL, CONTEXT_LIMIT } from '../config/constants.js';
import { ChatMessage } from '../types/index.js';
import { renderMarkdown } from '../utils/markdown.js';

export function clearScreenAndRedraw(chatMessages: ChatMessage[]): void {
  if (!DEBUG_MODE) {
    console.clear();
  }

  // Display key connection and configuration info (80 char max width)
  const serverUrl = API_BASE_URL;
  const contextSize = CONTEXT_LIMIT;

  // Show essential info in a compact format
  const infoLine = `Connected to: ${serverUrl} | Context: ${contextSize} tokens`;

  // Ensure it fits within the 80 character limit
  let displayLine = infoLine;
  if (displayLine.length > 76) {
    displayLine = displayLine.substring(0, 73) + '...';
  }

  console.log(colors.bold(displayLine));
  console.log('');

  // Display chat messages
  chatMessages.forEach((msg) => {
    if (msg.role === 'user') {
      console.log(colors.blue('User: ') + msg.content);
    } else if (msg.role === 'assistant') {
      console.log(colors.green('Assistant: ') + renderMarkdown(msg.content));
    } else if (msg.role === 'tool') {
      console.log(colors.yellow('Tool: ') + msg.content);
    }
  });

}
