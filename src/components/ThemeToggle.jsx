import useThemeStore from '@/store/themeStore';

import Button from '@/components/Button';
import { SunIcon, MoonIcon } from '@/components/Icons';

export default function ThemeToggle({ className = '' }) {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <Button 
            onClick={toggleTheme}
            variant="icon"
            className={`p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors ${className}`}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        >
            {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </Button>
    );
}
