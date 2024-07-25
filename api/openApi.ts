import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.khs.go.kr',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * ccbaMnm1: 국가유산명
 */
type Data = {
  params: {
    ccbaKdcd: number;
    ccbaMnm1: string;
  };
};

export const getPalace = async ({ params }: Data) => {
  const response = await api.get('/cha/SearchKindOpenapiList.do', { params });
  return response.data;
};
