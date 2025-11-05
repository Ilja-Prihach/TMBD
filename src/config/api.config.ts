
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

if (!BASE_URL || !API_KEY || !ACCESS_TOKEN) {
    throw new Error('Missing required environment variables for TMDB API');
}

export const apiConfig = {
    baseUrl: BASE_URL,
    apiKey: API_KEY,
    accessToken: ACCESS_TOKEN,
    imageBaseUrl: 'https://image.tmdb.org/t/p/',
} as const;