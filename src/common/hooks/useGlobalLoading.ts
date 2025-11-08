import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import type { RootState } from '@/app/model/store/store';

// Эндпоинты которые не должны триггерить глобальный лоадер
const EXCLUDED_ENDPOINTS = [
    'getGenres', // Загрузка жанров быстрая
];

export const useGlobalLoading = () => {
    const isLoading = useSelector((state: RootState) => {
        const apiState = state.moviesApi;

        if (!apiState) return false;

        const queries = Object.values(apiState.queries || {});
        const mutations = Object.values(apiState.mutations || {});


        const hasPendingQueries = queries.some(query =>
            query?.status === 'pending' &&
            !EXCLUDED_ENDPOINTS.includes(query.endpointName as string)
        );

        const hasPendingMutations = mutations.some(mutation =>
            mutation?.status === 'pending'
        );
        return hasPendingQueries || hasPendingMutations;
    });

    const [showLoading, setShowLoading] = useState(false);
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (isLoading) {
            setShowLoading(true);
        } else {
            timeoutId = setTimeout(() => {
                setShowLoading(false);
            }, 200);
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isLoading]);

    return showLoading;
};