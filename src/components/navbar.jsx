import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import Button from '@/components/button';
import ThemeToggle from '@/components/theme-toggle';
import { UserCircleIcon, HamburgerIcon, CloseIcon, LogoutIcon } from '@/components/icons';

import useAuthStore from '@/store/auth-store';
import { IMAGE_URLS, NAV_LINKS } from '@/utils/constants';

export default function Navbar({ onGetStartedClick, onLoginClick }) {
    const location = useLocation();
    const navigate = useNavigate();
    const publicRoutes = ['/', '/signup'];
    const isAuthenticated = !publicRoutes.includes(location.pathname);

    const userName = useAuthStore((state) => state.username) || 'Guest';
    const clearAuth = useAuthStore((state) => state.clearAuth);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const handleLogout = () => {
        clearAuth();
        setIsProfileDropdownOpen(false);
        if (isMobileMenuOpen) closeMobileMenu();
        navigate('/');
    };

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const NAV_AUTH_BUTTONS = [
        { id: 'get-started', text: 'Get Started', onClick: onGetStartedClick, variant: 'ghost' },
        { id: 'login', text: 'Login', onClick: onLoginClick, variant: 'primary' }
    ];

    return (
        <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-18 flex justify-between items-center">
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-indigo-500 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                        <img src={IMAGE_URLS.LOGO} className="h-10 w-10 relative z-10 transition-transform duration-500 group-hover:scale-110" alt="MovieHub logo" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 m-0 leading-tight">MovieHub</p> 
                        <p className="text-[10px] font-medium text-indigo-500 dark:text-indigo-400 tracking-wider uppercase m-0 leading-tight">Powered By TMDB</p>
                    </div>
                </div>
                {isAuthenticated ? (
                    <>
                        <nav className="hidden md:flex items-center gap-8">
                            {NAV_LINKS?.map((link) => (
                                <NavLink 
                                    key={link.url}
                                    to={link.url} 
                                    className={({ isActive }) => `text-sm font-semibold transition-colors duration-300 relative group ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full group-[.active]:w-full"></span>
                                </NavLink>
                            ))}
                        </nav>

                        <div className="hidden md:flex items-center gap-4">
                            <ThemeToggle className="rounded-full" />
                            <div className="relative flex items-center gap-3">
                                <Button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} variant="custom" className="flex items-center gap-3 focus:outline-none group">
                                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden group-hover:border-indigo-500 transition-colors">
                                        <UserCircleIcon className="w-6 h-6 text-slate-400 dark:text-slate-300" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden sm:block group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">{userName}</span>
                                </Button>
                                
                                {isProfileDropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setIsProfileDropdownOpen(false)}></div>
                                        <div className="absolute top-full right-0 mt-3 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg py-2 flex flex-col z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                                                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{userName}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">Movie Enthusiast</p>
                                            </div>
                                            <Button onClick={handleLogout} variant="custom" className="px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors w-full flex items-center gap-2">
                                                <LogoutIcon className="w-4 h-4" />
                                                Logout
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle className="rounded-full" />
                        {NAV_AUTH_BUTTONS?.map((action) => (
                            <Button key={action.id} onClick={action.onClick} text={action.text} variant={action.variant} size="sm" />
                        ))}
                    </div>
                )}
                <div className="md:hidden flex items-center gap-2">
                    <ThemeToggle className="rounded-full" />
                    <Button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        variant="icon"
                        className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <HamburgerIcon className="w-6 h-6" />}
                    </Button>
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
                                <Button onClick={handleLogout} variant="icon" className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors" aria-label="Logout">
                                    <LogoutIcon className="w-5 h-5" />
                                </Button>
                            </div>
                            <nav className="flex flex-col gap-1 pb-2">
                                {NAV_LINKS?.map((link) => (
                                    <NavLink 
                                        key={link.url}
                                        onClick={closeMobileMenu} 
                                        to={link.url} 
                                        className={({ isActive }) => `px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50'}`}
                                    >
                                        {link.name}
                                    </NavLink>
                                ))}
                            </nav>
                        </>
                    ) : (
                        <div className="flex flex-col gap-3 pb-2 pt-1">
                            {NAV_AUTH_BUTTONS?.map((action) => (
                                <Button 
                                    key={action.id} 
                                    onClick={() => { if(action.onClick) action.onClick(); closeMobileMenu(); }} 
                                    text={action.text} 
                                    variant={action.variant}
                                    fullWidth
                                    size="md"
                                    shape="rounded"
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
