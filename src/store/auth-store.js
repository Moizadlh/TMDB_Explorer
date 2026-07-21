import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            sessionId: null,
            accountId: null,
            username: '',
            setAuth: (sessionId, accountId, username) => set({ sessionId, accountId, username }),
            clearAuth: () => set({ sessionId: null, accountId: null, username: '' }),
        }),
        {
            name: 'movieHubAuthStorage', 
        }
    )
);

export default useAuthStore;
