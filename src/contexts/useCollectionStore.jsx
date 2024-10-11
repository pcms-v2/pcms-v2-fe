import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useCollectionStore = create(
  persist(
    set => ({
      collectionRoundId: {},
      setCollectionRoundId: collectionRoundId => {
        set({ collectionRoundId });
      },
      collectionRoundDetail: {},
      setCollectionRoundDetail: collectionRoundDetail => {
        set({ collectionRoundDetail });
      },
      collectionDispatch: {},
      setCollectionDispatch: collectionDispatch => {
        set({ collectionDispatch });
      },
    }),
    {
      name: 'collectionStore',
      // 세션 스토리지 사용 옵션 (default: local storage)
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useCollectionStore;
