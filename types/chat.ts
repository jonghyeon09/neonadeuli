export interface SendMessage {
  content: string;
  role: 'user';
  timestamp: string;
}

export interface ErrorMessage {
  content: '문제가 발생하였습니다.';
  role: 'assistant';
  timestamp: string;
}
