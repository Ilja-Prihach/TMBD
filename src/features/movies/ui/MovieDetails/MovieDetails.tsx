
import {
    useGetMovieCreditsQuery,
    useGetMovieDetailsQuery,
    useGetSimilarMoviesQuery
} from '@/features/movies/api/moviesApi.ts';
import s from './MovieDetails.module.css';
import {useNavigate, useParams} from "react-router";
import {CastSection} from "@/features/movies/ui/MovieDetails/CastSection/CastSection.tsx";

import {SimilarMovies} from "@/features/movies/ui/MovieDetails/SimilarMovies/SimilarMovies.tsx";
import {MovieInfo} from "@/features/movies/ui/MovieDetails/MovieInfo/MovieInfo.tsx";
import {Button} from "@/common/components/BackButton/Button.tsx";

export const MovieDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const movieId = Number(id);

    const { data: movie, isLoading, isError } = useGetMovieDetailsQuery(movieId);
    const { data: credits, isLoading: isCreditsLoading } = useGetMovieCreditsQuery(movieId);
    const { data: similarMovies, isLoading: isSimilarLoading } = useGetSimilarMoviesQuery(movieId);

    const handleGoBack = () => {
        navigate(-1);
    };

    if (isLoading) {
        return <div className={s.loading}>Loading movie details...</div>;
    }

    if (isError || !movie) {
        return <div className={s.error}>Error loading movie details</div>;
    }

    return (
        <div className={s.container}>
            <Button
                variant="primary"
                size="medium"
                onClick={handleGoBack}
                className={s.backButton}
            >
                ← Back
            </Button>

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