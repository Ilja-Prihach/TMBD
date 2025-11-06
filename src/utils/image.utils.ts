
import { apiConfig } from '@/config/api.config';

export const imageUrls = {
    poster: (path: string | null, size: 'w154' | 'w342' | 'w500' | 'w780' | 'original' = 'w342') =>
        path ? `${apiConfig.imageBaseUrl}${size}${path}` : '/placeholder-poster.jpg',

    backdrop: (path: string | null, size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280') =>
        path ? `${apiConfig.imageBaseUrl}${size}${path}` : '/placeholder-backdrop.jpg',

    profile: (path: string | null, size: 'w45' | 'w185' | 'h632' | 'original' = 'w185') =>
        path ? `${apiConfig.imageBaseUrl}${size}${path}` : '/placeholder-profile.jpg',
};