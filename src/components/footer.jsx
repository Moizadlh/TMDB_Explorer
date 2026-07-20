import logo from '../assets/logo.svg';
import { NavLink } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="w-full bg-slate-950/80 backdrop-blur-md border-t border-slate-800/50 pt-0 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-6">
                <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500 font-medium">
                        © {new Date().getFullYear()} MovieHub. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
