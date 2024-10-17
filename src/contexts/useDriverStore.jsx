import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useDriverStore = create(
  persist(
    set => ({
      driverList: {},
      setDriverList: driverList => {
        set({ driverList });
      },
      oneTonDriverList: {},
      setOneTonDriverList: oneTonDriverList => {
        set({ oneTonDriverList });
      },
      ldvDriverList: {},
      setLdvDriverList: ldvDriverList => {
        set({ ldvDriverList });
      },
    }),
    {
      name: 'driverStore',
      // 세션 스토리지 사용 옵션 (default: local storage)
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useDriverStore;
