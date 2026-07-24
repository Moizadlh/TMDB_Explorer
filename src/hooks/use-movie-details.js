import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMovieDetails, getMovieAccountStates, toggleFavourite } from "@/api/api";
import useAuthStore from "@/store/auth-store";

export function useMovieDetails(movieId) {
    const { sessionId, accountId } = useAuthStore();
    const queryClient = useQueryClient();

    const movieQuery = useQuery({
        queryKey: ["movie", movieId],
        queryFn: () => getMovieDetails(movieId),
        enabled: !!movieId,
    });

    const accountStatesQuery = useQuery({
        queryKey: ["movie", movieId, "accountStates", sessionId],
        queryFn: () => getMovieAccountStates({ movieId, sessionId }),
        enabled: !!movieId && !!sessionId,
    });

    const toggleFavouriteMutation = useMutation({
        mutationFn: ({ favorite }) => {
            if (!accountId || !sessionId) {
                return Promise.reject(new Error("User is not authenticated"));
            }
            return toggleFavourite({
                accountId,
                sessionId,
                mediaId: movieId,
                mediaType: 'movie',
                favorite,
            });
        },
        onSuccess: (data, variables) => {
            queryClient.setQueryData(["movie", movieId, "accountStates", sessionId], (old) => {
                if (old) {
                    return { ...old, favorite: variables.favorite };
                }
                return { favorite: variables.favorite };
            });
            queryClient.invalidateQueries({ queryKey: ["favourites"] });
        },
    });

    return {
        movie: movieQuery.data,
        isLoading: movieQuery.isLoading,
        isFavourite: accountStatesQuery.data?.favorite ?? false,
        toggleFavouriteStatus: () => toggleFavouriteMutation.mutate({ favorite: !(accountStatesQuery.data?.favorite ?? false) }),
        isTogglingFavourite: toggleFavouriteMutation.isPending,
    };
}
