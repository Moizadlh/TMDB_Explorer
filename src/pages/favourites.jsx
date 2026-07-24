import { useFavourites } from "@/hooks/use-favourites";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import useAuthStore from "@/store/auth-store";

import Navbar from '@/components/navbar';
import MovieCard from '@/components/movie-card';
import Footer from '@/components/footer';
import Loader from '@/components/loader';
import { HeartIcon, HeartOutlineIcon } from '@/components/icons';

export default function Favourites() {
    const { sessionId, accountId } = useAuthStore();

    const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useFavourites();
    const favouriteMovies = data?.pages?.flatMap((page) => page?.results) ?? [];

    const observerTarget = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

    const isMissingAuth = !sessionId || !accountId;

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-indigo-500/30 relative transition-colors duration-300">
            <Navbar />
            
            {isLoading && favouriteMovies?.length === 0 && !isMissingAuth && (
                <Loader fullScreen={true} text="FETCHING FAVOURITES..." />
            )}

            <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto flex-grow w-full">
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2 flex items-center gap-3">
                        <HeartIcon className="w-8 h-8 text-rose-500" />
                        Your Favourites
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Movies you've loved and saved for later.
                    </p>
                </div>

                {!isLoading && favouriteMovies?.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400">
                        <HeartOutlineIcon className="h-16 w-16 mb-6 opacity-20 text-rose-500" />
                        <p className="text-xl font-medium text-slate-700 dark:text-slate-300">
                            {isMissingAuth ? "Please log in to view your favourites." : "No favourites yet."}
                        </p>
                        {!isMissingAuth && (
                            <p className="text-sm mt-2">Explore movies and click the heart icon to add them here.</p>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 min-h-[400px]">
                            {favouriteMovies?.map((movie, index) => (
                                <MovieCard key={`${movie?.id}-${index}`} movie={movie} />
                            ))}
                        </div>

                        {hasNextPage && (
                            <div ref={observerTarget} className="h-10 mt-8 flex justify-center items-center">
                                {isFetchingNextPage && <Loader fullScreen={false} text="LOADING MORE..." />}
                            </div>
                        )}
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
}
