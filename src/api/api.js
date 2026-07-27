import {api} from '@/api/axiosInstance'

export const API_URLS = {
    TOKEN: {
        NEW: '/authentication/token/new',
        VALIDATE: '/authentication/token/validate_with_login',
    },

    SESSION: {
        NEW: '/authentication/session/new',
    },

    ACCOUNT: {
        DETAILS: '/account',
        GET_FAVOURITE_MOVIES: (accountId) => `/account/${accountId}/favorite/movies`,
        TOGGLE_FAVOURITE: (accountId) => `/account/${accountId}/favorite`,
    },

    MOVIE: {
        SEARCH: '/search/movie',
        POPULAR: '/movie/popular',
        DETAILS: (movieId) => `/movie/${movieId}`,
        ACCOUNT_STATES: (movieId) => `/movie/${movieId}/account_states`,
    },

    TV: {
        SEARCH: '/search/tv',
        POPULAR: '/tv/popular',
    },
};

export async function getRequestToken() {
    const { data } = await api.get(API_URLS.TOKEN.NEW);
    return data;
}

export async function validateLogin(payload) {
    const { data } = await api.post(API_URLS.TOKEN.VALIDATE, payload);
    return data;
}

export async function createSession(payload) {
    const { data } = await api.post(API_URLS.SESSION.NEW, payload);
    return data;
}

export async function getAccountDetails(sessionId) {
    const { data } = await api.get(API_URLS.ACCOUNT.DETAILS, {
        params: {
            session_id: sessionId,
        },
    });
    return data;
}

export const getPopularMovies = async ({ page }) => {
    const { data } = await api.get(API_URLS.MOVIE.POPULAR, {
        params: { page }
    });

    return data;
};

export const searchMovies = async ({ query, page }) => {
    const { data } = await api.get(API_URLS.MOVIE.SEARCH, {
        params: {
            query,
            page,
        },
    });

    return data;
};

export const getPopularTvShows = async ({ page }) => {
    const { data } = await api.get(API_URLS.TV.POPULAR, {
        params: { page }
    });
    return data;
};

export const searchTvShows = async ({ query, page }) => {
    const { data } = await api.get(API_URLS.TV.SEARCH, {
        params: {
            query,
            page,
        },
    });
    return data;
};

export const getFavouriteMovies = async ({ accountId, sessionId, page }) => {
    const { data } = await api.get(API_URLS.ACCOUNT.GET_FAVOURITE_MOVIES(accountId), {
        params: {
            session_id: sessionId,
            page,
        },
    });
    return data;
};

export const getMovieDetails = async (movieId) => {
    const { data } = await api.get(API_URLS.MOVIE.DETAILS(movieId), {
        params: { append_to_response: 'credits' }
    });
    return data;
};

export const getMovieAccountStates = async ({ movieId, sessionId }) => {
    const { data } = await api.get(API_URLS.MOVIE.ACCOUNT_STATES(movieId), {
        params: { session_id: sessionId }
    });
    return data;
};

export const toggleFavourite = async ({ accountId, sessionId, mediaId, mediaType, favorite }) => {
    const { data } = await api.post(
        API_URLS.ACCOUNT.TOGGLE_FAVOURITE(accountId),
        { media_type: mediaType, media_id: mediaId, favorite },
        { params: { session_id: sessionId } }
    );
    return data;
};
