import type {
  BotMessage,
  BuildingsInfo,
  End,
  HeritageList,
  Login,
  Quiz,
  Recommend,
  SendMessage,
  Session,
  Summary,
} from '@/types/api';
import { Location } from '@/types/course';
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

const sesstions = async (data: { user_id: number; heritage_id: 2944 }) => {
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

const quiz = async (session_id: number, data: { building_id: number }) => {
  const res = await instance.post<Quiz>(
    `/api/v1/chat/${session_id}/heritage/buildings/quiz`,
    data
  );

  return res;
};

const summary = async (session_id: number) => {
  const res = await instance.get<Summary>(
    `/api/v1/chat/sessions/${session_id}/summary`
  );

  return res;
};

const end = async (session_id: number, data: { buildings: Location[] }) => {
  const res = await instance.post<End>(
    `/api/v1/chat/sessions/${session_id}/end`,
    data
  );

  return res;
};

const recommendQuestions = async (
  session_id: number,
  data: { building_id: number }
) => {
  const res = await instance.post<Recommend>(
    `/api/v1/chat/${session_id}/building/recommend-questions`,
    data
  );

  return res;
};

const heritageList = async (params: {
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
}) => {
  const res = await instance.get<HeritageList>(`/api/v1/heritages/lists`, {
    params,
  });

  return res;
};

const api = {
  login,
  sesstions,
  messages,
  buildingsInfo,
  quiz,
  summary,
  end,
  recommendQuestions,
  heritageList,
};

export default api;
