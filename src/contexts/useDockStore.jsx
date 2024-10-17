import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useDockStore = create(
  persist(
    set => ({
      docksList: {},
      setDocksList: docksList => {
        set({ docksList });
      },
    }),
    {
      name: 'dockStore',
      // 세션 스토리지 사용 옵션 (default: local storage)
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useDockStore;
