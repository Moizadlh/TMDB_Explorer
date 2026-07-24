import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";

import { useMovies } from "@/hooks/use-movies";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";

import Navbar from '@/components/navbar';
import MovieCard from '@/components/movie-card';
import Footer from '@/components/footer';
import Loader from '@/components/loader';
import Input from '@/components/input';
import { MagnifyingGlassIcon } from '@/components/icons';

export default function Movies() {
    const [searchParams, setSearchParams] = useSearchParams();
    const urlSearchQuery = searchParams.get("search") || "";
    const [searchQuery, setSearchQuery] = useState(urlSearchQuery);

    const { data, isLoading, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useMovies(urlSearchQuery);
    const movies = data?.pages?.flatMap((page) => page?.results) ?? [];

    const observerTarget = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

    const updateDebouncedSearch = useMemo(
        () =>
            debounce((value) => {
                if (value.trim()) {
                    setSearchParams({ search: value });
                } else {
                    setSearchParams({});
                }
            }, 500),
        [setSearchParams]
    );

    useEffect(() => {
        return () => updateDebouncedSearch.cancel();
    }, [updateDebouncedSearch]);

    useEffect(() => {
        setSearchQuery(urlSearchQuery);
    }, [urlSearchQuery]);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-indigo-500/30 relative transition-colors duration-300">
            <Navbar />
            {isLoading && movies?.length === 0 && (
                <Loader fullScreen={true} text="FETCHING MOVIES..." />
            )}

            <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto flex-grow w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                            {searchQuery ? 'Search Results' : 'Popular Movies'}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            {searchQuery ? `Showing results for "${searchQuery}"` : 'Discover trending movies right now.'}
                        </p>
                    </div>
                    <Input 
                        type="text" 
                        placeholder="Search movies..." 
                        value={searchQuery}
                        onChange={({ target: { value } }) => {
                            setSearchQuery(value);
                            updateDebouncedSearch(value);
                        }}
                        icon={ isFetching && movies?.length > 0 && !isFetchingNextPage ? (
                            <div className="w-4 h-4 border-2 border-slate-300 dark:border-slate-500 border-t-indigo-500 rounded-full animate-spin"></div>
                        ) : (
                            <MagnifyingGlassIcon className="h-5 w-5" />
                        )}
                        containerClassName="w-full md:w-80"
                        className="!rounded-full shadow-sm dark:shadow-inner"
                    />
                </div>

                {isFetching && !isFetchingNextPage && movies?.length === 0 ? (
                    <div className="py-20">
                        <Loader fullScreen={false} text="SEARCHING..." />
                    </div>
                ) : movies?.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 min-h-[400px]">
                            {movies?.map((movie, index) => (
                                <MovieCard key={`${movie?.id}-${index}`} movie={movie} />
                            ))}
                        </div>
                        {hasNextPage && (
                            <div ref={observerTarget} className="h-10 mt-8 flex justify-center items-center">
                                {isFetchingNextPage && <Loader fullScreen={false} text="LOADING MORE..." />}
                            </div>
                        )}
                    </>
                ) : (
                    !isLoading && !isFetching && (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400 min-h-[400px]">
                            <MagnifyingGlassIcon className="h-12 w-12 mb-4 opacity-20" />
                            <p className="text-lg font-medium text-slate-700 dark:text-slate-300">No movies found.</p>
                            <p className="text-sm mt-1">Try adjusting your search.</p>
                        </div>
                    )
                )}
            </main>
            <Footer />
        </div>
    );
}
