import type { Login, Sessions } from '@/types/api';
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

const login = async () => {
  const res = await instance.post<Login>('/api/v1/users/login');
  console.log(res.data);

  return res.data;
};

const sesstions = async (data: { user_id: number; heritage_id: 1 }) => {
  const res = await instance.post<Sessions>('/api/v1/chat/sessions', data);

  return res.data;
};

const api = {
  login,
  sesstions,
};

export default api;
