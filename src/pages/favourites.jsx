import { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from '../components/navbar';
import MovieCard from '../components/movie-card';
import Footer from '../components/footer';
import tmdbClient from '../api/tmdb-client';
import Loader from '../components/loader';
import { HeartIcon, HeartOutlineIcon } from '../components/icons';
import { getAccountFavouriteMoviesEndpoint } from '../utils/helpers';

export default function Favourites() {
    const [allFetchedFavouriteMovies, setAllFetchedFavouriteMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTmdbApiPage, setCurrentTmdbApiPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const isInitialComponentLoad = useRef(true);
    const observerTarget = useRef(null);

    const fetchFavouriteMovies = useCallback(async (apiPage, append = false) => {
        const sessionId = localStorage.getItem('tmdb_session_id');
        const accountId = localStorage.getItem('tmdb_account_id');
        if (!sessionId || !accountId) {
            setAllFetchedFavouriteMovies([]);
            setIsLoading(false);
            if (isInitialComponentLoad.current) isInitialComponentLoad.current = false;
            return;
        }
        setIsLoading(true);
        try {
            const endpoint = getAccountFavouriteMoviesEndpoint(accountId);
            const params = { 
                session_id: sessionId,
                page: apiPage
            };
            const response = await tmdbClient.get(endpoint, { params });
            const results = response.data.results || [];
            setAllFetchedFavouriteMovies(prev => append ? [...prev, ...results] : results);
            setHasMore(response.data.page < response.data.total_pages);
        } catch (error) {
            console.error("Failed to fetch favourite movies:", error);
        } finally {
            setIsLoading(false);
            if (isInitialComponentLoad.current) isInitialComponentLoad.current = false;
        }
    }, []);

    useEffect(() => {
        setCurrentTmdbApiPage(1);
        setAllFetchedFavouriteMovies([]);
        fetchFavouriteMovies(1, false);
    }, [fetchFavouriteMovies]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !isLoading && !isInitialComponentLoad.current) {
                    const nextTmdbPage = currentTmdbApiPage + 1;
                    setCurrentTmdbApiPage(nextTmdbPage);
                    fetchFavouriteMovies(nextTmdbPage, true);
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
    }, [hasMore, isLoading, currentTmdbApiPage, fetchFavouriteMovies]);

    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 relative">
            <Navbar />
            
            {isLoading && allFetchedFavouriteMovies.length === 0 && isInitialComponentLoad.current && (
                <Loader fullScreen={true} text="FETCHING FAVOURITES..." />
            )}

            <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto flex-grow w-full">
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2 flex items-center gap-3">
                        <HeartIcon className="w-8 h-8 text-rose-500" />
                        Your Favourites
                    </h1>
                    <p className="text-slate-400 text-sm">
                        Movies you've loved and saved for later.
                    </p>
                </div>

                {!isLoading && allFetchedFavouriteMovies.length === 0 && !isInitialComponentLoad.current ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-500">
                        <HeartOutlineIcon className="h-16 w-16 mb-6 opacity-20 text-rose-500" />
                        <p className="text-xl font-medium text-slate-300">No favourites yet.</p>
                        <p className="text-sm mt-2">Explore movies and click the heart icon to add them here.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 min-h-[400px]">
                            {allFetchedFavouriteMovies.map((movie, index) => (
                                <MovieCard key={`${movie.id}-${index}`} movie={movie} />
                            ))}
                        </div>

                        <div ref={observerTarget} className="h-10 mt-8 flex justify-center items-center">
                            {isLoading && hasMore && <Loader fullScreen={false} text="LOADING MORE..." />}
                        </div>
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
}
