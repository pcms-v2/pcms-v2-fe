import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // Import the createJSONStorage function

const useTransportStore = create(
  persist(
    set => ({
      transportCompanyList: [],
      setTransportCompanyList: newTC => set({ transportCompanyList: newTC }),
    }),
    {
      name: 'transport',
      // 세션 스토리지 사용 옵션 (default: local storage)
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useTransportStore;
