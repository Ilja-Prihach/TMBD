

import { SearchBox } from "@/common/components/SearchBox/SearchBox.tsx";
import { useSearchMoviesQuery } from "@/features/movies/api/moviesApi.ts";

import s from "./Search.module.css";
import {useSearchParams} from "react-router";
import {MovieCard} from "@/common/components/MovieCard/MovieCard.tsx";

export const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';

    const { data, isLoading } = useSearchMoviesQuery(
        { query, page: 1 },
        { skip: !query.trim() }
    );

    // Если есть поисковый запрос и нет результатов
    const hasNoResults = query && data?.results.length === 0;
    // Если нет поискового запроса (начальное состояние)
    const isInitialState = !query;

    return (
        <div className={s.container}>
            <h2 className={s.title}>Search Results</h2>

            <div className={s.searchContainer}>
                <SearchBox placeholder="Find movies, TV shows..." />
            </div>

            {/* Начальное состояние */}
            {isInitialState && (
                <p className={s.description}>Enter a movie title to start searching.</p>
            )}

            {/* Загрузка */}
            {query && isLoading && (
                <p className={s.description}>Searching...</p>
            )}

            {/* Нет результатов */}
            {hasNoResults && (
                <p className={s.description}>No matches found for "{query}"</p>
            )}

            {/* Есть результаты */}
            {query && data && data.results.length > 0 && (
                <div className={s.resultsGrid}>
                    {data.results.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};