import axios from 'axios';
import { TMDB_API_BASE_URL } from '../utils/constants';

const api = axios.create({
    baseURL: TMDB_API_BASE_URL,
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
    },
});

export default api;
export const TOKEN_NEW_ENDPOINT = '/authentication/token/new';
export const TOKEN_VALIDATE_ENDPOINT = '/authentication/token/validate_with_login';
export const SESSION_NEW_ENDPOINT = '/authentication/session/new';
export const ACCOUNT_DETAILS_ENDPOINT = '/account';
export const SEARCH_MOVIE_ENDPOINT = '/search/movie';
export const POPULAR_MOVIE_ENDPOINT = '/movie/popular';
export const SEARCH_TV_ENDPOINT = '/search/tv';
export const POPULAR_TV_ENDPOINT = '/tv/popular';
export const getAccountFavouriteMoviesEndpoint = (accountId) => `/account/${accountId}/favorite/movies`;
export const getToggleFavouriteEndpoint = (accountId) => `/account/${accountId}/favorite`;
export const getMovieAccountStatesEndpoint = (movieId) => `/movie/${movieId}/account_states`;
export const getMovieEndpoint = (movieId) => `/movie/${movieId}`;
