import axios from 'axios';
import { useUserStore } from '../contexts/useUserStore'; // zustand 스토어를 import

// 기본 설정
const config = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  withCredentials: true,
};

// login axios 따로 생성
export const noneTokenApi = axios.create({
  baseURL: import.meta.env.VITE_PCMS_API_URL,
  ...config,
});

// axios 인스턴스 생성
const api = axios.create({
  baseURL: import.meta.env.VITE_PCMS_API_URL,
  ...config,
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  config => {
    const { userInfo } = useUserStore.getState(); // zustand 스토어에서 userInfo 가져오기
    if (!config._retry && userInfo?.accessToken) {
      config.headers.Authorization = `Bearer ${userInfo.accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
api.interceptors.response.use(
  response => response, // 성공적인 응답은 그대로 반환합니다.
  async error => {
    const originalRequest = error.config;
    // 토큰 만료 오류인지 확인합니다.
    if (
      error.response?.status === 401 &&
      error.response?.data.error === 'EXPIRED_TOKEN' &&
      !originalRequest._retry
    ) {
      if (error.response?.data.error === 'EXPIRED_TOKEN') {
        originalRequest._retry = true;
        const { userInfo } = useUserStore.getState();
        return noneTokenApi
          .post('/user/refresh', null, {
            headers: { Authorization: `Bearer ${userInfo.refreshToken}a` },
          })
          .then(response => {
            const newAccessToken = response.data.accessToken;
            useUserStore.getState().setUserInfo({
              ...userInfo,
              accessToken: newAccessToken,
              refreshToken: response.data.refreshToken,
            });
            originalRequest.headers['Authorization'] =
              `Bearer ${newAccessToken}`;
            return api(originalRequest);
          })
          .catch(refreshError => {
            useUserStore.getState().clearUser();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          });
      } else {
        useUserStore.getState().clearUser();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
