import logo from '../assets/icons/logo.svg';
import { NavLink } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-800/50 pt-0 pb-8 mt-auto transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors duration-300">
                    <p className="text-xs text-slate-500 font-medium">
                        © {new Date().getFullYear()} MovieHub. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
