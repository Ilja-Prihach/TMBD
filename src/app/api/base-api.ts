import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { apiConfig } from '@/config/api.config';

export const baseQuery = fetchBaseQuery({
    baseUrl: apiConfig.baseUrl,
    prepareHeaders: (headers) => {
        headers.set('Authorization', `Bearer ${apiConfig.accessToken}`);
        headers.set('Accept', 'application/json');
        return headers;
    },
});