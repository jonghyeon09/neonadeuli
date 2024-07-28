import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async () => {
  const res = await instance.post<{
    nickname: string;
    access_token: string;
    token_type: string;
    expires_in: number;
  }>('/api/v1/users/login');

  return res.data;
};

export const sesstions = async () => {
  const res = await instance.post<{
    id: number;
    user_id: number;
    heritage_id: number;
    start_time: Date;
    created_at: Date;
  }>('/api/v1/chat/sessions');

  return res.data;
};
