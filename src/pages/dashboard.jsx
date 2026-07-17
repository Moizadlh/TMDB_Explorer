import { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from '../components/navbar';
import Card from '../components/card';
import tmdbClient from '../api/tmdb-client';
import Loader from '../components/loader';
import { MagnifyingGlassIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [allFetchedMovies, setAllFetchedMovies] = useState([]);
    const [tmdbPage, setTmdbPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const isInitialLoad = useRef(true);
    const itemsPerPage = 12;

    const fetchMovies = useCallback(async (query, tPage, append = false) => {
        setIsLoading(true);
        try {
            const endpoint = query ? '/search/movie' : '/movie/popular';
            const params = { page: tPage };
            if (query) {
                params.query = query;
            }
            const response = await tmdbClient.get(endpoint, { params });
            const results = response.data.results || [];
            setAllFetchedMovies(prev => append ? [...prev, ...results] : results);
            setHasMore(response.data.page < response.data.total_pages);
        } catch (error) {
            console.error("Failed to fetch movies:", error);
        } finally {
            setIsLoading(false);
            if (isInitialLoad.current) isInitialLoad.current = false;
        }
    }, []);

    useEffect(() => {
        if (!isInitialLoad.current) {
            setIsSearching(true);
        }
        setCurrentPage(1);
        setTmdbPage(1);
        if (searchQuery) setAllFetchedMovies([]);
        fetchMovies(searchQuery, 1, false);
        setIsSearching(false);
        
        return (() => {});
    }, [searchQuery, fetchMovies]);

    useEffect(() => {
        const requiredMovies = currentPage * itemsPerPage;
        if (allFetchedMovies.length < requiredMovies && hasMore && !isLoading && !isSearching) {
            const nextTmdbPage = tmdbPage + 1;
            setTmdbPage(nextTmdbPage);
            fetchMovies(searchQuery, nextTmdbPage, true);
        }
    }, [currentPage, allFetchedMovies.length, hasMore, isLoading, isSearching, tmdbPage, searchQuery, fetchMovies]);

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
            {isLoading && currentMovies.length === 0 && isInitialLoad.current && (
                <Loader fullScreen={true} text="FETCHING MOVIES..." />
            )}

            <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                            {searchQuery ? 'Search Results' : 'Popular Movies'}
                        </h1>
                        <p className="text-slate-400 text-sm">
                            {searchQuery ? `Showing results for "${searchQuery}"` : 'Discover trending movies right now.'}
                        </p>
                    </div>
                    <div className="relative w-full md:w-80 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                            {isSearching ? (
                                <div className="w-4 h-4 border-2 border-slate-500 border-t-indigo-500 rounded-full animate-spin"></div>
                            ) : (
                                <MagnifyingGlassIcon className="h-5 w-5" />
                            )}
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search movies..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-900/80 border border-slate-700/50 rounded-full py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-inner placeholder-slate-500"
                        />
                    </div>
                </div>

                {(isLoading || isSearching) && !isInitialLoad.current && currentMovies.length === 0 ? (
                    <div className="py-20">
                        <Loader fullScreen={false} text="SEARCHING..." />
                    </div>
                ) : currentMovies.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 min-h-[400px]">
                        {currentMovies.map((movie) => (
                            <Card key={movie.id} movie={movie} />
                        ))}
                    </div>
                ) : (
                    !isLoading && !isSearching && (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-500 min-h-[400px]">
                            <MagnifyingGlassIcon className="h-12 w-12 mb-4 opacity-20" />
                            <p className="text-lg font-medium">No movies found.</p>
                            <p className="text-sm mt-1">Try adjusting your search.</p>
                        </div>
                    )
                )}

                {isLoading && currentMovies.length > 0 && (
                    <div className="mt-8">
                        <Loader fullScreen={false} text="LOADING MORE..." />
                    </div>
                )}

                {currentMovies.length > 0 && (
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
                            Page <span className="text-white">{currentPage}</span>
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
            </main>
        </div>
    );
}