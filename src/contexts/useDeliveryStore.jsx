import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useDeliveryStore = create(
  persist(
    set => ({
      deliveryRoundId: {},
      setDeliveryRoundId: deliveryRoundId => {
        set({ deliveryRoundId });
      },
      deliveryRoundDetail: {},
      setDeliveryRoundDetail: deliveryRoundDetail => {
        set({ deliveryRoundDetail });
      },
      deliveryDispatch: {},
      setDeliveryDispatch: deliveryDispatch => {
        set({ deliveryDispatch });
      },
    }),
    {
      name: 'deliveryStore',
      // 세션 스토리지 사용 옵션 (default: local storage)
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useDeliveryStore;
