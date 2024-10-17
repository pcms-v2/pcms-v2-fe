import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useRecoveryStore = create(
  persist(
    set => ({
      recoveryRoundId: {},
      setRecoveryRoundId: recoveryRoundId => {
        set({ recoveryRoundId });
      },
      recoveryRoundDetail: {},
      setRecoveryRoundDetail: recoveryRoundDetail => {
        set({ recoveryRoundDetail });
      },
      recoveryDispatch: {},
      setRecoveryDispatch: recoveryDispatch => {
        set({ recoveryDispatch });
      },
    }),
    {
      name: 'recoveryStore',
      // 세션 스토리지 사용 옵션 (default: local storage)
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useRecoveryStore;
