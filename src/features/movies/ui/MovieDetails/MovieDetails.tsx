
import {
    useGetMovieCreditsQuery,
    useGetMovieDetailsQuery,
    useGetSimilarMoviesQuery
} from '@/features/movies/api/moviesApi.ts';
import s from './MovieDetails.module.css';
import {useParams} from "react-router";
import {CastSection} from "@/features/movies/ui/MovieDetails/CastSection/CastSection.tsx";
import {BackButton} from "@/common/components/BackButton/BackButton.tsx";
import {SimilarMovies} from "@/features/movies/ui/MovieDetails/SimilarMovies/SimilarMovies.tsx";
import {MovieInfo} from "@/features/movies/ui/MovieDetails/MovieInfo/MovieInfo.tsx";

export const MovieDetails = () => {
    const { id } = useParams<{ id: string }>();
    const movieId = Number(id);

    const { data: movie, isLoading, isError } = useGetMovieDetailsQuery(movieId);
    const { data: credits, isLoading: isCreditsLoading } = useGetMovieCreditsQuery(movieId);
    const { data: similarMovies, isLoading: isSimilarLoading } = useGetSimilarMoviesQuery(movieId);

    if (isLoading) {
        return <div className={s.loading}>Loading movie details...</div>;
    }

    if (isError || !movie) {
        return <div className={s.error}>Error loading movie details</div>;
    }

    return (
        <div className={s.container}>
            <BackButton/>

            <MovieInfo movie={movie} />

            {!isCreditsLoading && credits && credits.cast && (
                <CastSection cast={credits.cast} />
            )}

            {!isSimilarLoading && similarMovies && similarMovies.results && (
                <SimilarMovies movies={similarMovies.results} />
            )}
        </div>
    );
};