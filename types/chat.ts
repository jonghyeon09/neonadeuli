import type { BotMessage, SendMessage, Summary } from './api';

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
  | QuizMessage
  | SummaryMessage;

export interface ErrorMessage {
  content: '작은 문제가 생겼소. 잠시 후에 다시 시도해 보시는 건 어떠시오?';
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

export interface SummaryMessage extends Summary {
  role: 'summary';
}
