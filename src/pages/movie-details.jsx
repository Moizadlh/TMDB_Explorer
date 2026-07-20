import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StarIcon, PlayIcon, HeartIcon, ArrowLeftIcon, ClockIcon, CalendarIcon, HeartOutlineIcon } from '../components/icons';
import tmdbClient from '../api/tmdb-client';
import Loader from '../components/loader';
import Footer from '../components/footer';
import { formatRuntime, getReleaseYear } from '../utils/helpers';
import { getToggleFavouriteEndpoint, getMovieAccountStatesEndpoint } from '../utils/helpers';

export default function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setIsLoading(true);
            try {
                const endpoint = `/movie/${id}`;
                const params = { append_to_response: 'credits' };
                const response = await tmdbClient.get(endpoint, { params });
                setMovie(response.data);
                const sessionId = localStorage.getItem('tmdb_session_id');
                if (sessionId) {
                    const statesEndpoint = getMovieAccountStatesEndpoint(id);
                    const statesParams = { session_id: sessionId };
                    const accountStatesResponse = await tmdbClient.get(statesEndpoint, { params: statesParams });
                    setIsFavourite(accountStatesResponse.data.favorite);
                }
            } catch (error) {
                console.error("Failed to fetch movie details:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovieDetails();
    }, [id]);

    const handleToggleFavouriteStatus = async () => {
        const sessionId = localStorage.getItem('tmdb_session_id');
        const accountId = localStorage.getItem('tmdb_account_id');
        if (!sessionId || !accountId) {
            console.error("User is not authenticated");
            return;
        }
        const newFavouriteStatus = !isFavourite;
        setIsFavourite(newFavouriteStatus);
        try {
            const endpoint = getToggleFavouriteEndpoint(accountId);
            const payload = {
                media_type: 'movie',
                media_id: movie.id,
                favorite: newFavouriteStatus
            };
            const params = { session_id: sessionId };
            await tmdbClient.post(endpoint, payload, { params });
        } catch (error) {
            console.error("Failed to toggle favourite:", error);
            setIsFavourite(!newFavouriteStatus);
        }
    };

    if (isLoading) {
        return <Loader fullScreen={true} text="LOADING MOVIE..." />;
    }

    if (!movie) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
                >
                    <ArrowLeftIcon className="w-5 h-5" /> Back to Dashboard
                </button>
            </div>
        );
    }

    const backdropUrl = movie.backdrop_path 
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : null;
        
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null;

    const releaseYear = getReleaseYear(movie.release_date);
    const runtimeFormatted = formatRuntime(movie.runtime);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
            <div className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-slate-950/80 to-transparent">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 bg-slate-900/50 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700/50 hover:bg-slate-800 transition-colors text-white text-sm font-medium"
                >
                    <ArrowLeftIcon className="w-4 h-4" /> Back
                </button>
                <div className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
                     <span className="text-indigo-500">TMDB</span> Explorer
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
                    <div className="w-full h-full bg-slate-900"></div>
                )}
                
                <div className="absolute inset-0 bg-slate-950/30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent md:w-3/4"></div>
            </div>

            <main className="max-w-7xl mx-auto px-6 -mt-32 md:-mt-64 relative z-10 pb-20">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    
                    <div className="w-48 md:w-72 flex-shrink-0 mx-auto md:mx-0 -mt-16 md:mt-0">
                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-slate-900 aspect-[2/3]">
                            {posterUrl ? (
                                <img src={posterUrl} alt={movie.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-slate-500">No Image</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-end pt-4 md:pt-10">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {movie.genres?.map(genre => (
                                <span key={genre.id} className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-semibold tracking-wide">
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
                            {movie.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 font-medium mb-8">
                            <div className="flex items-center gap-1.5">
                                <StarIcon className="w-5 h-5 text-amber-400" />
                                <span className="text-white text-base font-bold">{movie.vote_average?.toFixed(1)}</span>
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
                            <button className="flex items-center gap-2 bg-white text-slate-950 hover:bg-slate-200 px-8 py-3.5 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95">
                                <PlayIcon className="w-6 h-6" />
                                Watch Now
                            </button>
                            <button 
                                onClick={handleToggleFavouriteStatus}
                                className={`flex items-center justify-center w-14 h-14 rounded-full border transition-all ${
                                    isFavourite 
                                    ? 'bg-rose-500/10 border-rose-500/50 text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.2)]' 
                                    : 'bg-slate-900/80 border-slate-700/50 text-white hover:bg-slate-800'
                                }`}
                            >
                                {isFavourite ? (
                                    <HeartIcon className="w-6 h-6 animate-[ping_0.3s_ease-in-out_1]" />
                                ) : (
                                    <HeartOutlineIcon className="w-6 h-6" />
                                )}
                            </button>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-3">Overview</h3>
                            <p className="text-slate-300 leading-relaxed max-w-3xl text-lg opacity-90">
                                {movie.overview || "No overview available."}
                            </p>
                        </div>
                    </div>
                </div>

                {movie.credits?.cast?.length > 0 && (
                    <div className="mt-16 border-t border-slate-800/50 pt-12">
                        <h3 className="text-2xl font-bold text-white mb-6">Top Cast</h3>
                        <div className="flex overflow-x-auto gap-4 pb-6 snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {movie.credits.cast.slice(0, 10).map(actor => (
                                <div key={actor.id} className="snap-start flex-shrink-0 w-32 md:w-36 group">
                                    <div className="rounded-xl overflow-hidden mb-3 aspect-[2/3] bg-slate-900 border border-slate-800 group-hover:border-indigo-500/30 transition-colors">
                                        {actor.profile_path ? (
                                            <img 
                                                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} 
                                                alt={actor.name} 
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-700">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <h4 className="text-white font-semibold text-sm truncate">{actor.name}</h4>
                                    <p className="text-slate-500 text-xs truncate mt-0.5">{actor.character}</p>
                                </div>
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
