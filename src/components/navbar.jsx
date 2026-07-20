import { NavLink, useLocation } from 'react-router-dom';
import { UserCircleIcon } from './icons';
import logo from '../assets/icons/logo.svg';

export default function Navbar() {
    const location = useLocation();
    const isAuthenticated = location.pathname !== '/';
    const userName = localStorage.getItem('tmdb_username') || 'Guest';

    return (
        <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-18 flex justify-between items-center">
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-indigo-500 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                        <img src={logo} className="h-10 w-10 relative z-10 transition-transform duration-500 group-hover:scale-110" alt="MovieHub logo" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300 m-0 leading-tight">MovieHub</p> 
                        <p className="text-[10px] font-medium text-indigo-400 tracking-wider uppercase m-0 leading-tight">Powered By TMDB</p>
                    </div>
                </div>
                
                {isAuthenticated ? (
                    <>
                        <nav className="hidden md:flex items-center gap-8">
                            <NavLink 
                                to="/dashboard" 
                                className={({ isActive }) => `text-sm font-semibold transition-colors duration-300 relative group ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                            >
                                Dashboard
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full group-[.active]:w-full"></span>
                            </NavLink>
                            <NavLink 
                                to="/tvshows" 
                                className={({ isActive }) => `text-sm font-semibold transition-colors duration-300 relative group ${isActive && location.pathname !== '/' && location.pathname !== '/favourites' && location.pathname !== '/dashboard' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                            >
                                Tv Shows
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full group-[.active]:w-full"></span>
                            </NavLink>
                            <NavLink 
                                to="/favourites" 
                                className={({ isActive }) => `text-sm font-semibold transition-colors duration-300 relative group ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                            >
                                Favourites 
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full group-[.active]:w-full"></span>
                            </NavLink>
                        </nav>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-800 border border-slate-700 overflow-hidden cursor-pointer hover:border-indigo-500 transition-colors">
                                <UserCircleIcon className="w-6 h-6 text-slate-300" />
                            </div>
                            <span className="text-sm font-medium text-slate-300 hidden sm:block cursor-pointer hover:text-white transition-colors">{userName}</span>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-4">
                        <button className="px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-300 relative group">
                            Get Started
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                        </button>
                        <button className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
                            Login
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
