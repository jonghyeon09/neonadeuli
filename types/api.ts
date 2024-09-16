export enum AreaCode {
  서울 = 11,
  부산 = 21,
  대구 = 22,
  인천 = 23,
  광주 = 24,
  대전 = 25,
  울산 = 26,
  경기 = 31,
  강원 = 32,
  충북 = 33,
  충남 = 34,
  전북 = 35,
  전남 = 36,
  경북 = 37,
  경남 = 38,
  세종 = 45,
  제주 = 50,
}

export interface Login {
  id: number;
  username: string;
  access_token: string;
  token_type: string;
}

export interface Building {
  building_id: number;
  coordinate: [number, number];
  name: string;
}

interface Route {
  buildings: Building[];
  name: string;
  route_id: number;
}

export interface Session {
  session_id: number;
  user_id: number;
  heritage_id: number;
  heritage_name: string;
  routes: Route[];
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

export interface Summary {
  chat_date: string;
  heritage_name: string;
  building_course: string[];
  keywords: string[];
}

export interface End {
  session_id: number;
  end_time: string;
}

export interface Recommend {
  building_id: number;
  questions: string[];
}

export interface Heritage {
  id: number;
  name: string;
  location: string;
  heritage_type: string;
  image_url: string;
  distance: number;
}
export interface HeritageList {
  items: Heritage[];
  total_count: number;
  page: number;
  limit: number;
}

export interface heritageListParams {
  user_latitude: number;
  user_longitude: number;
  page?: number;
  limit?: number;
  name?: string;
  area_code?: number;
  heritage_type?: number[];
  distance_range?: string;
  sort_by?: 'id' | 'distance';
  sort_order?: '오름차순' | '내림차순';
}

export interface HeritageDetail {
  id: number;
  image_url: string;
  name: string;
  name_hanja: string;
  description: string;
  heritage_type: string;
  category: string;
  sub_category1: string;
  sub_category2: string;
  era: string;
  location: string;
}

export interface SessionStatus {
  session_id: number;
  ended_status: boolean;
}
