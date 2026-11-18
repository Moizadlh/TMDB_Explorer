import { useInfiniteQuery } from "@tanstack/react-query";

import { getPopularTvShows, searchTvShows } from "@/api/api";

export function useTvShows(searchQuery) {
    return useInfiniteQuery({
        queryKey: ["tvShows", searchQuery],
        queryFn: ({ pageParam }) => {
            if (searchQuery) {
                return searchTvShows({
                    query: searchQuery,
                    page: pageParam,
                });
            }
            return getPopularTvShows({
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
