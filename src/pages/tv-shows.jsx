import { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from '../components/navbar';
import MovieCard from '../components/movie-card';
import Footer from '../components/footer';
import Loader from '../components/loader';
import { MagnifyingGlassIcon } from '../components/icons';
import api from "../api/api";
import { SEARCH_TV_ENDPOINT, POPULAR_TV_ENDPOINT } from '../api/api';

export default function TvShows() {
    const [searchQuery, setSearchQuery] = useState('');
    const [allFetchedMediaItems, setAllFetchedMediaItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [currentTmdbApiPage, setCurrentTmdbApiPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const isInitialComponentLoad = useRef(true);
    const observerTarget = useRef(null);

    const fetchMediaItems = useCallback(async (query, apiPage, append = false) => {
        setIsLoading(true);
        try {
            const endpoint = query ? SEARCH_TV_ENDPOINT : POPULAR_TV_ENDPOINT;
            const params = { page: apiPage };
            if (query) {
                params.query = query;
            }
            const response = await api.get(endpoint, { params });
            const results = response.data.results || [];
            setAllFetchedMediaItems(prev => append ? [...prev, ...results] : results);
            setHasMore(response.data.page < response.data.total_pages);
        } catch (error) {
            console.error("Failed to fetch media items:", error);
        } finally {
            setIsLoading(false);
            if (isInitialComponentLoad.current) isInitialComponentLoad.current = false;
        }
    }, []);

    useEffect(() => {
        if (!isInitialComponentLoad.current) {
            setIsSearching(true);
        }
        setCurrentTmdbApiPage(1);
        if (searchQuery) setAllFetchedMediaItems([]);
        fetchMediaItems(searchQuery, 1, false);
        setIsSearching(false);
        
        return (() => {});
    }, [searchQuery, fetchMediaItems]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !isLoading && !isSearching) {
                    const nextTmdbPage = currentTmdbApiPage + 1;
                    setCurrentTmdbApiPage(nextTmdbPage);
                    fetchMediaItems(searchQuery, nextTmdbPage, true);
                }
            },
            { threshold: 1.0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [hasMore, isLoading, isSearching, currentTmdbApiPage, searchQuery, fetchMediaItems]);

    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 relative">
            <Navbar />
            {isLoading && allFetchedMediaItems.length === 0 && isInitialComponentLoad.current && (
                <Loader fullScreen={true} text="FETCHING Shows..." />
            )}

            <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto flex-grow w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                            {searchQuery ? 'Search Results' : 'Popular Shows'}
                        </h1>
                        <p className="text-slate-400 text-sm">
                            {searchQuery ? `Showing results for "${searchQuery}"` : 'Discover trending shows right now.'}
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
                            placeholder="Search shows..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-900/80 border border-slate-700/50 rounded-full py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-inner placeholder-slate-500"
                        />
                    </div>
                </div>

                {(isLoading || isSearching) && !isInitialComponentLoad.current && allFetchedMediaItems.length === 0 ? (
                    <div className="py-20">
                        <Loader fullScreen={false} text="SEARCHING..." />
                    </div>
                ) : allFetchedMediaItems.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 min-h-[400px]">
                            {allFetchedMediaItems.map((show, index) => (
                                <MovieCard key={`${show.id}-${index}`} tvShow={show} />
                            ))}
                        </div>
                        <div ref={observerTarget} className="h-10 mt-8 flex justify-center items-center">
                            {isLoading && hasMore && <Loader fullScreen={false} text="LOADING MORE..." />}
                        </div>
                    </>
                ) : (
                    !isLoading && !isSearching && (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-500 min-h-[400px]">
                            <MagnifyingGlassIcon className="h-12 w-12 mb-4 opacity-20" />
                            <p className="text-lg font-medium">No shows found.</p>
                            <p className="text-sm mt-1">Try adjusting your search.</p>
                        </div>
                    )
                )}
            </main>
            <Footer />
        </div>
    );
}
