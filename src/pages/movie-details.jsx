import { useParams, useNavigate } from 'react-router-dom';

import { useMovieDetails } from '@/hooks/use-movie-details';

import Loader from '@/components/loader';
import Footer from '@/components/footer';
import Button from '@/components/button';
import GenreList from '@/components/genre-list';
import CastCard from '@/components/cast-card';
import { StarIcon, PlayIcon, HeartIcon, ArrowLeftIcon, ClockIcon, CalendarIcon, HeartOutlineIcon } from '@/components/icons';

import { formatRuntime, getReleaseYear, getImageUrl } from '@/utils/index';
import { size } from 'zod';

export default function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const { movie, isLoading, isFavourite, toggleFavouriteStatus, isTogglingFavourite } = useMovieDetails(id);

    if (isLoading) {
        return <Loader fullScreen={true} text="LOADING MOVIE..." />;
    }

    if (!movie) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
                <Button 
                    onClick={() => navigate('/dashboard')}
                    variant="custom"
                    className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
                >
                    <ArrowLeftIcon className="w-5 h-5" /> Back to Dashboard
                </Button>
            </div>
        );
    }

    const backdropUrl = getImageUrl(movie.backdrop_path , 'original');
    const posterUrl = getImageUrl(movie.poster_path);
    const releaseYear = getReleaseYear(movie.release_date);
    const runtimeFormatted = formatRuntime(movie.runtime);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden transition-colors duration-300">
            <div className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-white/80 dark:from-slate-950/80 to-transparent">
                <Button 
                    onClick={() => navigate(-1)}
                    variant="custom"
                    className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/50 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white text-sm font-medium"
                >
                    <ArrowLeftIcon className="w-4 h-4" /> Back
                </Button>
                <div className="font-bold text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                     <span className="text-indigo-600 dark:text-indigo-500">TMDB</span> Explorer
                </div>
            </div>

            <div className="relative w-full h-[60vh] md:h-[60vh]">
                {backdropUrl ? (
                    <img 
                        src={backdropUrl} 
                        alt={`${movie.title} backdrop`} 
                        className="w-full h-full object-cover object-top"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-200 dark:bg-slate-900"></div>
                )}
                
                <div className="absolute inset-0 bg-white/30 dark:bg-slate-950/30 transition-colors duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-slate-50/80 dark:via-slate-950/80 to-transparent transition-colors duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-50 dark:from-slate-950 via-slate-50/60 dark:via-slate-950/60 to-transparent md:w-3/4 transition-colors duration-300"></div>
            </div>

            <main className="max-w-7xl mx-auto px-6 -mt-32 md:-mt-64 relative z-10 pb-20">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    
                    <div className="w-48 md:w-72 flex-shrink-0 mx-auto md:mx-0 -mt-16 md:mt-0">
                        <div className="rounded-2xl overflow-hidden border border-slate-300/50 dark:border-slate-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-slate-100 dark:bg-slate-900 aspect-[2/3] transition-colors duration-300">
                            {posterUrl ? (
                                <img src={posterUrl} alt={movie.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-slate-400 dark:text-slate-500">No Image</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-end pt-4 md:pt-10">
                        <div className="mb-4">
                            <GenreList genres={movie.genres} />
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
                            {movie.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400 font-medium mb-8">
                            <div className="flex items-center gap-1.5">
                                <StarIcon className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                                <span className="text-slate-900 dark:text-white text-base font-bold">{movie.vote_average?.toFixed(1)}</span>
                                <span>({movie.vote_count} votes)</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <CalendarIcon className="w-5 h-5 opacity-70" />
                                <span>{releaseYear}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <ClockIcon className="w-5 h-5 opacity-70" />
                                <span>{runtimeFormatted}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mb-10">
                            <Button variant="secondary" size="lg">
                                <PlayIcon className="w-6 h-6" />
                                Watch Now
                            </Button>
                            <Button 
                                onClick={() => !isTogglingFavourite && toggleFavouriteStatus()}
                                variant="icon"
                                className={`flex items-center justify-center w-14 h-14 rounded-full border transition-all ${
                                    isFavourite 
                                    ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/50 text-rose-500 shadow-[0_4px_20px_rgba(244,63,94,0.1)] dark:shadow-[0_0_20px_rgba(244,63,94,0.2)]' 
                                    : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-700/50 text-slate-400 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm'
                                } ${isTogglingFavourite ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isFavourite ? (
                                    <HeartIcon className="w-6 h-6 animate-[ping_0.3s_ease-in-out_1]" />
                                ) : (
                                    <HeartOutlineIcon className="w-6 h-6" />
                                )}
                            </Button>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Plot Summary</h3>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl text-lg opacity-90">
                                {movie.overview || "No overview available."}
                            </p>
                        </div>
                    </div>
                </div>

                {movie.credits?.cast?.length > 0 && (
                    <div className="mt-16 border-t border-slate-200 dark:border-slate-800/50 pt-12">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Top Cast</h3>
                        <div className="flex overflow-x-auto gap-4 pb-6 snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {movie?.credits?.cast?.slice(0, 10)?.map(actor => (
                                <CastCard key={actor.id} actor={actor} />
                            ))}
                        </div>
                    </div>
                )}
            </main>
            <Footer />
            
            <style dangerouslySetInnerHTML={{__html: `
                .snap-x::-webkit-scrollbar {
                    display: none;
                }
            `}} />
        </div>
    );
}
