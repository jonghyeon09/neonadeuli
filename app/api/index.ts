import type {
  BotMessage,
  BuildingsInfo,
  Login,
  SendMessage,
  Session,
} from '@/types/api';
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

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status,
      };
    }

    return Promise.reject(error);
  }
);

const login = async () => {
  const res = await instance.post<Login>('/api/v1/users/login');

  return res;
};

const sesstions = async (data: { user_id: number; heritage_id: 1 }) => {
  const res = await instance.post<Session>('/api/v1/chat/sessions', data);

  return res;
};

const messages = async (sessionId: number, data: SendMessage) => {
  const res = await instance.post<BotMessage>(
    `/api/v1/chat/sessions/${sessionId}/messages`,
    data
  );

  return res;
};

const buildingsInfo = async (
  sessionId: number,
  locationName: string,
  data: { building_id: number }
) => {
  const res = await instance.post<BuildingsInfo>(
    `/api/v1/chat/${sessionId}/heritage/buildings/info?content=${locationName}에 대해 알려줘`,
    data
  );

  return res;
};

const api = {
  login,
  sesstions,
  messages,
  buildingsInfo,
};

export default api;
