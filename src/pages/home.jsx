import { useState } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Button from '@/components/button';
import GenreList from '@/components/genre-list';
import MovieCard from '@/components/movie-card';
import { PlayIcon, InformationCircleIcon, StarIcon, ClockIcon, CalendarIcon } from '@/components/icons';

import { HERO_MOVIE, RELATED_MOVIES } from '@/utils/constants';

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
                            src={HERO_MOVIE?.backdrop} 
                            alt={HERO_MOVIE?.title} 
                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/20 to-transparent dark:from-slate-950 dark:via-slate-950/40 dark:to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/50 to-transparent dark:from-slate-950 dark:via-slate-950/60 dark:to-transparent w-full md:w-3/4"></div>
                    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20 md:pb-12">
                        <div className="max-w-3xl transform transition-all duration-500">
                            <div className="mb-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                <GenreList genres={HERO_MOVIE?.genres} />
                            </div>
                            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 drop-shadow-lg">
                                {HERO_MOVIE?.title}
                            </h1>
                            <p className="text-lg md:text-xl text-slate-800 dark:text-slate-300 mb-8 line-clamp-3 md:line-clamp-none drop-shadow-md max-w-2xl font-medium">
                                {HERO_MOVIE?.description}
                            </p>
                            <div className={`flex items-center gap-6 mb-8 overflow-hidden transition-all duration-500 ${isHeroHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-semibold bg-white/50 dark:bg-slate-900/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                                    <StarIcon className="w-5 h-5 text-yellow-500 drop-shadow-md" />
                                    <span>{HERO_MOVIE?.rating} / 10</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold bg-white/50 dark:bg-slate-900/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                                    <ClockIcon className="w-5 h-5 opacity-70" />
                                    <span>{HERO_MOVIE?.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold bg-white/50 dark:bg-slate-900/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                                    <CalendarIcon className="w-5 h-5 opacity-70" />
                                    <span>{HERO_MOVIE?.releaseYear}</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <Button variant="secondary" size="lg">
                                    <PlayIcon className="w-6 h-6 fill-current" />
                                    Watch Now
                                </Button>
                                <Button variant="outline" size="lg">
                                    <InformationCircleIcon className="w-6 h-6" />
                                    More Info
                                </Button>
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
                        {RELATED_MOVIES?.map((movie) => (
                            <MovieCard key={movie?.id} movie={movie} />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
