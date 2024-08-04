import type { BotMessage, SendMessage } from './api';

export interface LocationMessages {
  [sessionId: number]: {
    messages: Message[];
  } | null;
}

export type Message =
  | BotMessage
  | SendMessage
  | ErrorMessage
  | InfoMessage
  | QuizMessage;

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

export interface QuizCount {
  [sessionId: number]: number | null;
}

export interface QuizMessage {
  content: string;
  role: 'quiz';
  timestamp: string;
}
