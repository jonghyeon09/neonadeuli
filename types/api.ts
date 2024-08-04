export interface Login {
  id: number;
  username: string;
  access_token: string;
  token_type: string;
}

export interface Session {
  session_id: number;
  user_id: number;
  heritage_id: number;
  heritage_name: string;
  routes: object[];
  start_time: string;
  created_at: string;
}

export interface BotMessage {
  id: number;
  session_id: number;
  role: 'assistant';
  content: string;
  timestamp: string;
}

export interface SendMessage {
  content: string;
  role: 'user';
  timestamp: string;
}

export interface BuildingsInfo {
  image_url: string;
  bot_response: string;
}

export interface Quiz {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  quiz_count: number;
}
