import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserCircleIcon, SunIcon, MoonIcon, HamburgerIcon, CloseIcon } from './icons';
import logo from '../assets/icons/logo.svg';
import useThemeStore from '../store/theme-store';
import useAuthStore from '../store/auth-store';

export default function Navbar({ onGetStartedClick, onLoginClick }) {
    const location = useLocation();
    const { theme, toggleTheme } = useThemeStore();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isAuthenticated = location.pathname !== '/';
    const userName = useAuthStore((state) => state.username) || 'Guest';
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const navigate = useNavigate();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const handleLogout = () => {
        clearAuth();
        setIsProfileDropdownOpen(false);
        if (isMobileMenuOpen) closeMobileMenu();
        navigate('/');
    };

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-18 flex justify-between items-center">
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-indigo-500 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                        <img src={logo} className="h-10 w-10 relative z-10 transition-transform duration-500 group-hover:scale-110" alt="MovieHub logo" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 m-0 leading-tight">MovieHub</p> 
                        <p className="text-[10px] font-medium text-indigo-500 dark:text-indigo-400 tracking-wider uppercase m-0 leading-tight">Powered By TMDB</p>
                    </div>
                </div>
                
                {/* Desktop Navigation */}
                {isAuthenticated ? (
                    <>
                        <nav className="hidden md:flex items-center gap-8">
                            <NavLink 
                                to="/home" 
                                className={({ isActive }) => `text-sm font-semibold transition-colors duration-300 relative group ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
                            >
                                Home
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full group-[.active]:w-full"></span>
                            </NavLink>
                            <NavLink 
                                to="/movies" 
                                className={({ isActive }) => `text-sm font-semibold transition-colors duration-300 relative group ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
                            >
                                Movies
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full group-[.active]:w-full"></span>
                            </NavLink>
                            <NavLink 
                                to="/tvshows" 
                                className={({ isActive }) => `text-sm font-semibold transition-colors duration-300 relative group ${isActive && location.pathname !== '/' && location.pathname !== '/favourites' && location.pathname !== '/home' && location.pathname !== '/movies' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
                            >
                                Tv Shows
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full group-[.active]:w-full"></span>
                            </NavLink>
                            <NavLink 
                                to="/favourites" 
                                className={({ isActive }) => `text-sm font-semibold transition-colors duration-300 relative group ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
                            >
                                Favourites 
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full group-[.active]:w-full"></span>
                            </NavLink>
                        </nav>

                        <div className="hidden md:flex items-center gap-4">
                            <button 
                                onClick={toggleTheme}
                                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                                title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                            >
                                {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                            </button>
                            <div className="relative flex items-center gap-3">
                                <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="flex items-center gap-3 focus:outline-none group">
                                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden group-hover:border-indigo-500 transition-colors">
                                        <UserCircleIcon className="w-6 h-6 text-slate-400 dark:text-slate-300" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden sm:block group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">{userName}</span>
                                </button>
                                
                                {isProfileDropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setIsProfileDropdownOpen(false)}></div>
                                        <div className="absolute top-full right-0 mt-3 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg py-2 flex flex-col z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                                                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{userName}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">Movie Enthusiast</p>
                                            </div>
                                            <button onClick={handleLogout} className="px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors w-full flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                                Logout
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="hidden md:flex items-center gap-4">
                        <button 
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                        </button>
                        <button onClick={onGetStartedClick} className="px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 relative group">
                            Get Started
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                        </button>
                        <button onClick={onLoginClick} className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
                            Login
                        </button>
                    </div>
                )}
                <div className="md:hidden flex items-center gap-2">
                    <button 
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                    </button>
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <HamburgerIcon className="w-6 h-6" />}
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-xl py-4 px-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
                    {isAuthenticated ? (
                        <>
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                        <UserCircleIcon className="w-6 h-6 text-slate-400 dark:text-slate-300" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{userName}</p>
                                        <p className="text-xs font-medium text-indigo-500 dark:text-indigo-400 cursor-pointer hover:underline">View Profile</p>
                                    </div>
                                </div>
                                <button onClick={handleLogout} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors" aria-label="Logout">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                </button>
                            </div>
                            <nav className="flex flex-col gap-1 pb-2">
                                <NavLink onClick={closeMobileMenu} to="/home" className={({ isActive }) => `px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50'}`}>Home</NavLink>
                                <NavLink onClick={closeMobileMenu} to="/movies" className={({ isActive }) => `px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50'}`}>Movies</NavLink>
                                <NavLink onClick={closeMobileMenu} to="/tvshows" className={({ isActive }) => `px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${isActive && location.pathname !== '/' && location.pathname !== '/favourites' && location.pathname !== '/home' && location.pathname !== '/movies' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50'}`}>Tv Shows</NavLink>
                                <NavLink onClick={closeMobileMenu} to="/favourites" className={({ isActive }) => `px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50'}`}>Favourites</NavLink>
                            </nav>
                        </>
                    ) : (
                        <div className="flex flex-col gap-3 pb-2 pt-1">
                            <button onClick={() => { if(onGetStartedClick) onGetStartedClick(); closeMobileMenu(); }} className="w-full py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                Get Started
                            </button>
                            <button onClick={() => { if(onLoginClick) onLoginClick(); closeMobileMenu(); }} className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-colors">
                                Login
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
