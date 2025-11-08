
import { useState } from 'react';
import { useGetFilteredMoviesQuery } from '@/features/movies/api/moviesApi';
import s from './FilteredMovies.module.css';
import {type FilterState, MovieFilters} from "@/common/components/MovieFilters/MovieFilters.tsx";
import {MoviesPagination} from "@/features/movies/ui/FilteredMovies/MoviesPagination/MoviesPagination.tsx";
import {MoviesResults} from "@/features/movies/ui/FilteredMovies/MoviesResults/MoviesResults.tsx";



export const FilteredMovies = () => {
    const [filters, setFilters] = useState<FilterState>({
        sort_by: 'popularity.desc',
        vote_average: { gte: 0, lte: 10 },
        with_genres: [],
        page: 1,
    });

    const { data, isLoading, isError } = useGetFilteredMoviesQuery({
        sort_by: filters.sort_by,
        'vote_average.gte': filters.vote_average.gte,
        'vote_average.lte': filters.vote_average.lte,
        with_genres: filters.with_genres.join(','),
        page: filters.page,
    });

    const handleFiltersChange = (newFilters: FilterState) => {
        setFilters({ ...newFilters, page: 1 }); // Сбрасываем на первую страницу при изменении фильтров
    };

    const handlePageChange = (newPage: number) => {
        setFilters(prev => ({ ...prev, page: newPage }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const movies = data?.results || [];
    const totalPages = Math.min(data?.total_pages || 1, 500);

    return (
        <div className={s.container}>
            <h1 className={s.title}>Discover Movies</h1>

            <div className={s.content}>
                {/* Блок фильтров */}
                <aside className={s.filtersSidebar}>
                    <MovieFilters onFiltersChange={handleFiltersChange} />
                </aside>

                {/* Блок результатов */}
                <main className={s.results}>
                    <MoviesResults
                        movies={movies}
                        isLoading={isLoading}
                        isError={isError}
                    />

                    {/* Пагинация */}
                    <MoviesPagination
                        currentPage={filters.page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </main>
            </div>
        </div>
    );
};