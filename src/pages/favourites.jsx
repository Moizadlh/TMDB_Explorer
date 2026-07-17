import { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from '../components/navbar';
import Card from '../components/card';
import tmdbClient from '../api/tmdb-client';
import Loader from '../components/loader';
import { HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Favourites() {
    const [allFetchedMovies, setAllFetchedMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [tmdbPage, setTmdbPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const isInitialLoad = useRef(true);
    const itemsPerPage = 12;

    const fetchFavourites = useCallback(async (apiPage, append = false) => {
        const sessionId = localStorage.getItem('tmdb_session_id');
        const accountId = localStorage.getItem('tmdb_account_id');
        if (!sessionId || !accountId) {
            setAllFetchedMovies([]);
            setIsLoading(false);
            if (isInitialLoad.current) isInitialLoad.current = false;
            return;
        }
        setIsLoading(true);
        try {
            const endpoint = `/account/${accountId}/favorite/movies`;
            const params = { 
                session_id: sessionId,
                page: apiPage
            };
            const response = await tmdbClient.get(endpoint, { params });
            const results = response.data.results || [];
            setAllFetchedMovies(prev => append ? [...prev, ...results] : results);
            setHasMore(response.data.page < response.data.total_pages);
        } catch (error) {
            console.error("Failed to fetch favourite movies:", error);
        } finally {
            setIsLoading(false);
            if (isInitialLoad.current) isInitialLoad.current = false;
        }
    }, []);

    useEffect(() => {
        fetchFavourites(1, false);
    }, [fetchFavourites]);

    useEffect(() => {
        const requiredMovies = currentPage * itemsPerPage;
        if (allFetchedMovies.length < requiredMovies && hasMore && !isLoading && !isInitialLoad.current) {
            const nextTmdbPage = tmdbPage + 1;
            setTmdbPage(nextTmdbPage);
            fetchFavourites(nextTmdbPage, true);
        }
    }, [currentPage, allFetchedMovies.length, hasMore, isLoading, tmdbPage, fetchFavourites]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentMovies = allFetchedMovies.slice(startIndex, startIndex + itemsPerPage);
    const canGoNext = (allFetchedMovies.length > currentPage * itemsPerPage) || hasMore;
    const canGoPrev = currentPage > 1;

    const handleNext = () => {
        if (canGoNext) setCurrentPage(prev => prev + 1);
    };

    const handlePrev = () => {
        if (canGoPrev) setCurrentPage(prev => prev - 1);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 relative">
            <Navbar />
            
            {isLoading && (
                <Loader fullScreen={true} text="FETCHING FAVOURITES..." />
            )}

            <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto min-h-screen flex flex-col">
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2 flex items-center gap-3">
                        <HeartIcon className="w-8 h-8 text-rose-500" />
                        Your Favourites
                    </h1>
                    <p className="text-slate-400 text-sm">
                        Movies you've loved and saved for later.
                    </p>
                </div>

                {!isLoading && allFetchedMovies.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-500">
                        <HeartOutlineIcon className="h-16 w-16 mb-6 opacity-20 text-rose-500" />
                        <p className="text-xl font-medium text-slate-300">No favourites yet.</p>
                        <p className="text-sm mt-2">Explore movies and click the heart icon to add them here.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                            {currentMovies.map((movie) => (
                                <Card key={movie.id} movie={movie} />
                            ))}
                        </div>

                        {allFetchedMovies.length > itemsPerPage && (
                            <div className="flex items-center justify-center gap-4 mt-12">
                                <button 
                                    onClick={handlePrev}
                                    disabled={!canGoPrev}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                                        !canGoPrev 
                                            ? 'bg-slate-900/50 text-slate-600 cursor-not-allowed border border-slate-800' 
                                            : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 hover:border-slate-600'
                                    }`}
                                >
                                    <ArrowLeftIcon className="w-4 h-4" />
                                    Previous
                                </button>
                                
                                <span className="text-sm font-medium text-slate-400">
                                    Page <span className="text-white">{currentPage}</span> of {Math.ceil(allFetchedMovies.length / itemsPerPage)}
                                </span>

                                <button 
                                    onClick={handleNext}
                                    disabled={!canGoNext}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                                        !canGoNext 
                                            ? 'bg-slate-900/50 text-slate-600 cursor-not-allowed border border-slate-800' 
                                            : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-[0_0_15px_rgba(79,70,229,0.3)]'
                                    }`}
                                >
                                    Next
                                    <ArrowRightIcon className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
