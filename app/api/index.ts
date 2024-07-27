import axios from 'axios';

export const login = async () => {
  const res = await axios.post('/api/v1/users/login');

  return res.data;
};
