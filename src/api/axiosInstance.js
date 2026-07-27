import axios from 'axios';

import { TMDB_API_BASE_URL } from '@/utils/constants';

export const api = axios.create({
    baseURL: TMDB_API_BASE_URL,
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
    },
});
