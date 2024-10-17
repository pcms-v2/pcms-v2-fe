import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // Import the createJSONStorage function

const useRoutingStore = create(
  persist(
    set => ({
      routeType: {},
      routeMainDetail: {},
      setRouteType: routeType => {
        set({ routeType });
      },
      setRouteMainDetail: routeMain => {
        set({ routeMainDetail: routeMain });
      },
    }),
    {
      name: 'routing',
      // 세션 스토리지 사용 옵션 (default: local storage)
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useRoutingStore;
