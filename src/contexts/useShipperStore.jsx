import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // Import the createJSONStorage function

const useShipperStore = create(
  persist(
    set => ({
      shipperList: [],
      setShipperList: newShipper => set({ shipperList: newShipper }),
    }),
    {
      name: 'shipper',
      // 세션 스토리지 사용 옵션 (default: local storage)
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useShipperStore;
