import { useEffect } from 'react';
import useThemeStore from '../store/theme-store';

export function ThemeProvider({ children }) {
    const theme = useThemeStore((state) => state.theme);

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    return children;
}
