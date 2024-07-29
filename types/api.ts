export interface Login {
  id: number;
  username: string;
  access_token: string;
  token_type: string;
}

export interface Sessions {
  session_id: number;
  user_id: number;
  heritage_id: number;
  heritage_name: string;
  routes: object[];
  start_time: string;
  created_at: string;
}

export interface Message {
  id: number;
  session_id: number;
  role: 'user' | 'bot';
  content: string;
  timestamp: string;
}
