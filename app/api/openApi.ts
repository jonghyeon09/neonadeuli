import axios from 'axios';
import { parseStringPromise } from 'xml2js';

const api = axios.create({
  baseURL: 'https://www.khs.go.kr',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * ccbaMnm1: 국가유산명
 */
type Palace = {
  params: {
    ccbaKdcd: string;
    ccbaMnm1: string;
  };
};

type Image = {
  params: {
    ccbaKdcd: string;
    ccbaAsno: string;
    ccbaCtcd: string;
  };
};

type Detail = {
  params: {
    ccbaKdcd: string;
    ccbaAsno: string;
    ccbaCtcd: string;
  };
};

export const getPalace = async (params: Palace) => {
  const response = await api.get('/cha/SearchKindOpenapiList.do', params);
  const xmlData = response.data;
  const jsonData = await parseStringPromise(xmlData);
  const data: HeritageList = jsonData.result;

  return data;
};

export const getImage = async (params: Image) => {
  const response = await api.get('/cha/SearchImageOpenapi.do', params);
  const xmlData = response.data;
  const jsonData = await parseStringPromise(xmlData);
  const data = jsonData.result;

  return data;
};

export const getDetail = async (params: Detail) => {
  const response = await api.get('/cha/SearchKindOpenapiDt.do', params);
  const xmlData = response.data;
  const jsonData = await parseStringPromise(xmlData);
  const data: HeritageDetail = jsonData.result;

  return data;
};
