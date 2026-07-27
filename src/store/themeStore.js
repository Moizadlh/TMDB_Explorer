import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
    persist(
        (set) => ({
            theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
            toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: 'movieHubTheme', 
        }
    )
);

export default useThemeStore;
