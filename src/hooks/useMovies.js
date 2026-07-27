import { useInfiniteQuery } from "@tanstack/react-query";

import { getPopularMovies, searchMovies } from "@/api/api";

export function useMovies(searchQuery) {
    return useInfiniteQuery({
        queryKey: ["movies", searchQuery],
        queryFn: ({ pageParam }) => {
            if (searchQuery) {
                return searchMovies({
                    query: searchQuery,
                    page: pageParam,
                });
            }
            return getPopularMovies({
                page: pageParam,
            });
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage?.page < lastPage?.total_pages
                ? lastPage?.page + 1
                : undefined;
        },
    });
}