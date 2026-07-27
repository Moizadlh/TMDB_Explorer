import { useInfiniteQuery } from "@tanstack/react-query";

import { getFavouriteMovies } from "@/api/api";
import useAuthStore from "@/store/authStore";

export function useFavourites() {
    const { sessionId, accountId } = useAuthStore();

    return useInfiniteQuery({
        queryKey: ["favourites", accountId, sessionId],
        queryFn: ({ pageParam }) => {
            return getFavouriteMovies({
                accountId,
                sessionId,
                page: pageParam,
            });
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage?.page < lastPage?.total_pages
                ? lastPage?.page + 1
                : undefined;
        },
        enabled: !!sessionId && !!accountId,
    });
}
