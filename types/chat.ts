import type { BotMessage, SendMessage } from './api';

export interface ErrorMessage {
  content: '문제가 발생하였습니다.';
  role: 'error';
  timestamp: string;
}

export interface InfoMessage {
  content: string;
  image_url: string;
  role: 'info';
  timestamp: string;
}

export interface LocationMessages {
  [sessionId: number]: {
    messages: Messages;
  } | null;
}

export type Messages = (
  | BotMessage
  | SendMessage
  | ErrorMessage
  | InfoMessage
)[];
