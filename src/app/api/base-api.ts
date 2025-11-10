import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { apiConfig } from '@/config/api.config';
import {handleErrors} from "@/common/utils/errorHandler.ts";

export const baseQuery = async (args: any, api: any, extraOptions: any) => {
    const result = await fetchBaseQuery({
        baseUrl: apiConfig.baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${apiConfig.accessToken}`);
            headers.set('Accept', 'application/json');
            return headers;
        },
    }) (args, api, extraOptions)


    if (result.error) {
        handleErrors(result.error);
    }

    return result;
};