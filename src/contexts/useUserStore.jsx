import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // Import the createJSONStorage function

// 유저 정보를 저장하는 store
export const useUserStore = create(
  persist(
    set => ({
      userInfo: {},
      setUserInfo: userData => {
        set({ userInfo: userData });
      },
      clearUser: () => set({ userInfo: null }),
    }),
    {
      name: 'userInfo',
      // 세션 스토리지 사용 옵션 (default: local storage)
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const clearUserStorage = useUserStore.persist.clearStorage; // uuserInfo 스토리지 삭제
