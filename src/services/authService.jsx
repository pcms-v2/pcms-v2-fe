import axios from 'axios';
import { useUserStore, clearUserStorage } from '../contexts/useUserStore';

const API_URL =
  'https://my-json-server.typicode.com/mj9457/DEMO_JSON/profile/admin1'; // admin = admin1, user = user1

export const login = async (username, password) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      username,
      password,
    });
    if (response) {
      console.log('로그인 성공');
      useUserStore.getState().setUser(response.data); // Zustand store에 사용자 데이터 저장
    }
    return response.data;
  } catch (error) {
    console.error('로그인 오류:', error);
    throw error;
  }
};

export const setToken = token => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const logout = () => {
  console.log('로그아웃 되었습니다.');
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  localStorage.removeItem('user');
  clearUserStorage();
};

// 모든 요청에 토큰을 포함시키기 위한 axios 인터셉터 추가
axios.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 토큰 만료 처리를 위한 axios 인터셉터 추가
axios.interceptors.response.use(
  response => response,
  async error => {
    if (
      error.response.status === 401 &&
      error.response.data.message === 'Token expired'
    ) {
      // 토큰 만료 처리 (예: 사용자 로그아웃, 토큰 갱신)
      logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
