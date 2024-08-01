import type { BotMessage, Login, Session } from '@/types/api';
import { SendMessage } from '@/types/chat';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_DOMAIN;

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

const login = async () => {
  const res = await instance.post<Login>('/api/v1/users/login');
  console.log(res.data);

  return res.data;
};

const sesstions = async (data: { user_id: number; heritage_id: 1 }) => {
  try {
    const res = await instance.post<Session>('/api/v1/chat/sessions', data);
    console.log(res);

    return res.data;
  } catch (error) {
    console.error('세션 생성 실패');
  }
};

const messages = async (sessionId: number, data: SendMessage) => {
  console.log(data);

  const res = await instance.post<BotMessage>(
    `/api/v1/chat/sessions/${sessionId}/messages`,
    data
  );

  return res;
};

const api = {
  login,
  sesstions,
  messages,
};

export default api;
