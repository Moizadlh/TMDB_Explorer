import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { PlayIcon, InformationCircleIcon, StarIcon, ClockIcon, CalendarIcon } from '../components/icons';

const HERO_MOVIE = {
    title: "The Odyssey",
    description: "Odysseus, the legendary King of Ithaca, embarks on a long and perilous journey home following the Trojan War. Throughout his voyage, he is forced to confront the whims of gods, mythological monsters, and trials that stretch both his cunning and his humanity to the breaking point.",
    releaseYear: "2026",
    duration: "2h 53m",
    rating: "8.8",
    genres: ["Adventure", "Action", "Fantasy"],
    backdrop: "https://image.tmdb.org/t/p/original/tYuC9kUwqhpDQ3pv1kLMqyMF1Jw.jpg",
};

const RELATED_MOVIES = [
    { id: 1, title: "Oppenheimer", poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", rating: "8.1" },
    { id: 2, title: "Deadpool & Wolverine", poster: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg", rating: "8.0" },
    { id: 3, title: "Furiosa: A Mad Max Saga", poster: "https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg", rating: "7.7" },
    { id: 4, title: "Scary Movie", poster: "https://image.tmdb.org/t/p/w500/1KlYdWoOrbL5ux357rW9LC155qw.jpg", rating: "7.7" },
    { id: 5, title: "Inception", poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg", rating: "8.4" },
    { id: 6, title: "The Dark Knight", poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", rating: "8.5" }
];

export default function Home() {
    const [isHeroHovered, setIsHeroHovered] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-indigo-500/30">
            <Navbar />
            <main className="flex-grow w-full">
                <section 
                    className="relative w-full h-[85vh] min-h-[600px] flex items-end group overflow-hidden"
                    onMouseEnter={() => setIsHeroHovered(true)}
                    onMouseLeave={() => setIsHeroHovered(false)}
                >
                    <div className="absolute inset-0 w-full h-full">
                        <img 
                            src={HERO_MOVIE.backdrop} 
                            alt={HERO_MOVIE.title} 
                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/20 to-transparent dark:from-slate-950 dark:via-slate-950/40 dark:to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/50 to-transparent dark:from-slate-950 dark:via-slate-950/60 dark:to-transparent w-full md:w-3/4"></div>
                    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20 md:pb-12">
                        <div className="max-w-3xl transform transition-all duration-500">
                            <div className="flex gap-2 mb-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                {HERO_MOVIE.genres.map(genre => (
                                    <span key={genre} className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-indigo-600/80 backdrop-blur-md rounded-full shadow-lg">
                                        {genre}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 drop-shadow-lg">
                                {HERO_MOVIE.title}
                            </h1>
                            <p className="text-lg md:text-xl text-slate-800 dark:text-slate-300 mb-8 line-clamp-3 md:line-clamp-none drop-shadow-md max-w-2xl font-medium">
                                {HERO_MOVIE.description}
                            </p>
                            <div className={`flex items-center gap-6 mb-8 overflow-hidden transition-all duration-500 ${isHeroHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-semibold bg-white/50 dark:bg-slate-900/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                                    <StarIcon className="w-5 h-5 text-yellow-500 drop-shadow-md" />
                                    <span>{HERO_MOVIE.rating} / 10</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold bg-white/50 dark:bg-slate-900/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                                    <ClockIcon className="w-5 h-5 opacity-70" />
                                    <span>{HERO_MOVIE.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold bg-white/50 dark:bg-slate-900/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                                    <CalendarIcon className="w-5 h-5 opacity-70" />
                                    <span>{HERO_MOVIE.releaseYear}</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <button className="flex items-center gap-2 px-8 py-4 text-base md:text-lg font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transition-all duration-300 hover:-translate-y-1">
                                    <PlayIcon className="w-6 h-6 fill-current" />
                                    Watch Now
                                </button>
                                <button className="flex items-center gap-2 px-8 py-4 text-base md:text-lg font-bold text-slate-900 dark:text-white bg-white/30 dark:bg-slate-800/50 hover:bg-white/50 dark:hover:bg-slate-700/60 backdrop-blur-md rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <InformationCircleIcon className="w-6 h-6" />
                                    More Info
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="max-w-7xl mx-auto px-6 py-6 md:py-20 relative z-20 -mt-4">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                            <span className="w-2 h-8 bg-indigo-500 rounded-full inline-block"></span>
                            Trending Now
                        </h2>
                        <Link to="/movies" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors">
                            View All
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                        {RELATED_MOVIES.map((movie) => (
                            <div 
                                key={movie.id} 
                                className="relative rounded-2xl overflow-hidden aspect-[2/3] group cursor-pointer shadow-lg dark:shadow-none ring-1 ring-slate-200/50 dark:ring-slate-800/50 bg-slate-200 dark:bg-slate-800"
                            >
                                <img 
                                    src={movie.poster} 
                                    alt={movie.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                    <h3 className="text-white font-bold text-sm mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{movie.title}</h3>
                                    <div className="flex items-center gap-1 text-yellow-500 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                        <StarIcon className="w-4 h-4" />
                                        <span className="text-xs font-semibold text-white">{movie.rating}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
