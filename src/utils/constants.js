import loginBanner from '@/assets/images/auth-banner.png';
import logo from '@/assets/icons/logo.svg';

import { UserOutline , LockOutline } from '@/components/Icons';

export const IMAGE_URLS = {
    LOGO: logo , 
    LOGIN_BANNER: loginBanner,
} 

export const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';

export const NAV_LINKS = [
    { url: '/home', name: 'Home' },
    { url: '/movies', name: 'Movies' },
    { url: '/tvshows', name: 'Tv Shows' },
    { url: '/favourites', name: 'Favourites' },
];

export const HERO_MOVIE = {
    title: "The Odyssey",
    description: "Odysseus, the legendary King of Ithaca, embarks on a long and perilous journey home following the Trojan War. Throughout his voyage, he is forced to confront the whims of gods, mythological monsters, and trials that stretch both his cunning and his humanity to the breaking point.",
    releaseYear: "2026",
    duration: "2h 53m",
    rating: "8.8",
    genres: [
        {
        "id": 12,
        "name": "Adventure"
        },
        {
        "id": 28,
        "name": "Action"
        },
        {
        "id": 778,
        "name": "Fantasy"
        }
    ],
    backdrop: "https://image.tmdb.org/t/p/original/tYuC9kUwqhpDQ3pv1kLMqyMF1Jw.jpg",
};

export const RELATED_MOVIES = [
    { id: 1, title: "Oppenheimer", poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", vote_average: 8.1, release_date: "2023-07-19" },
    { id: 2, title: "Deadpool & Wolverine", poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg", vote_average: 8.0, release_date: "2024-07-24" },
    { id: 3, title: "Furiosa: A Mad Max Saga", poster_path: "/iADOJ8Zymht2JPMoy3R7xceZprc.jpg", vote_average: 7.7, release_date: "2024-05-22" },
    { id: 4, title: "Scary Movie", poster_path: "/1KlYdWoOrbL5ux357rW9LC155qw.jpg", vote_average: 7.7, release_date: "2000-07-07" },
    { id: 5, title: "Inception", poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg", vote_average: 8.4, release_date: "2010-07-15" },
    { id: 6, title: "The Dark Knight", poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", vote_average: 8.5, release_date: "2008-07-16" }
];

export const LOGIN_INPUTS = [
    {
        id: "login-username",
        name: "username",
        label: "Username",
        placeholder: "your username",
        type: "text",
        icon: UserOutline,
    },
    {
        id: "login-password",
        name: "password",
        label: "Password",
        placeholder: "••••••••",
        type: "password",
        icon: LockOutline,
    }
];

export const SIGNUP_INPUTS = [
    {
        id: "signup-username",
        name: "username",
        label: "Username",
        placeholder: "username",
        type: "text",
    },
    {
        id: "signup-email",
        name: "email",
        label: "Email",
        placeholder: "email@example.com",
        type: "email",
    },
    {
        name: "gender",
        type: "radio-group",
    },
    {
        id: "signup-password",
        name: "password",
        label: "Password",
        placeholder: "••••••••",
        type: "password",
    },
    {
        id: "signup-confirm-password",
        name: "confirmPassword",
        label: "Confirm Password",
        placeholder: "••••••••",
        type: "password",
    }
];

export const BUTTON_VARIANTS = {
    primary: {
        className: "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] hover:from-indigo-500 hover:to-indigo-400 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden group/btn disabled:opacity-50 disabled:cursor-not-allowed",
        // decorativeElement: 
        decorativeElement: true,
    },
    secondary: {
        className: "bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
    },
    outline: {
        className: "bg-white/30 dark:bg-slate-800/50 hover:bg-white/50 dark:hover:bg-slate-700/60 backdrop-blur-md shadow-lg text-slate-900 dark:text-white transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 border border-slate-200 dark:border-slate-700"
    },
    ghost: {
        className: "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300 disabled:opacity-50"
    },
    icon: {
        className: "transition-colors duration-300 disabled:opacity-50"
    },
    custom: {
        className: ""
    }
};

export const SIZE_CLASSES = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm md:text-base",
    lg: "px-8 py-3.5 text-base font-bold",
    icon: "p-2",
    none: ""
};

export const SHAPE_CLASSES = {
    pill: "rounded-full",
    rounded: "rounded-xl",
    none: ""
};
