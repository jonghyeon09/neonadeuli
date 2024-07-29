export interface Login {
  id: number;
  username: string;
  access_token: string;
  token_type: string;
}

export interface Sessions {
  id: number;
  user_id: number;
  heritage_id: number;
  start_time: Date;
  created_at: Date;
}

export interface Message {
  id: number;
  session_id: number;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}
