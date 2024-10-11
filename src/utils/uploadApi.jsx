// src/api.js
import axios from 'axios';
import { useUserStore } from '../contexts/useUserStore';

const uploadConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Cache-Control': 'no-cache',
  },
};

const uploadApi = axios.create({
  baseURL: import.meta.env.VITE_PCMS_API_URL,
  ...uploadConfig,
});

uploadApi.interceptors.request.use(
  config => {
    const { userInfo } = useUserStore.getState(); // zustand 스토어에서 userInfo 가져오기
    if (userInfo && userInfo.accessToken) {
      config.headers.Authorization = `Bearer ${userInfo.accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default uploadApi;
