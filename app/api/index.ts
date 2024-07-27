import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
