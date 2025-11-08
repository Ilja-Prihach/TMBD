

import { MovieCard } from '@/common/components/MovieCard/MovieCard';
import s from './MoviesResults.module.css';
import type {Movie} from "@/features/movies/api/moviesApi.types.ts";

interface MoviesResultsProps {
    movies: Movie[];
    isLoading: boolean;
    isError: boolean;
}

export const MoviesResults = ({ movies, isLoading, isError }: MoviesResultsProps) => {
    if (isError) {
        return (
            <div className={s.container}>
                <div className={s.error}>Error loading movies. Please try again.</div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className={s.container}>
                <div className={s.loading}>Loading movies...</div>
            </div>
        );
    }

    if (movies.length === 0) {
        return (
            <div className={s.container}>
                <div className={s.noResults}>
                    <h3>No movies found</h3>
                    <p>Try adjusting your filters to find more movies.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={s.moviesGrid}>
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};