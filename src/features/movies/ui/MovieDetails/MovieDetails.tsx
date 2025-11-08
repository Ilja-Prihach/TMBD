
import {useGetMovieCreditsQuery, useGetMovieDetailsQuery} from '@/features/movies/api/moviesApi.ts';
import s from './MovieDetails.module.css';
import {useParams} from "react-router";
import {CastSection} from "@/features/movies/ui/MovieDetails/CastSection/CastSection.tsx";

export const MovieDetails = () => {
    const { id } = useParams<{ id: string }>();
    const movieId = Number(id);

    const { data: movie, isLoading, isError } = useGetMovieDetailsQuery(movieId);
    const { data: credits, isLoading: isCreditsLoading } = useGetMovieCreditsQuery(movieId);

    if (isLoading) {
        return <div className={s.loading}>Loading movie details...</div>;
    }

    if (isError || !movie) {
        return <div className={s.error}>Error loading movie details</div>;
    }

    return (
        <div className={s.container}>
            <div className={s.movieHeader}>
                <h1 className={s.title}>{movie.title}</h1>
                {movie.tagline && <p className={s.tagline}>{movie.tagline}</p>}
            </div>

            <div className={s.movieContent}>
                <div className={s.posterSection}>
                    <img
                        src={movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : 'https://placehold.co/500x750/2d2d2d/ffffff?text=No+Poster'
                        }
                        alt={movie.title}
                        className={s.poster}
                    />
                </div>

                <div className={s.detailsSection}>
                    <div className={s.rating}>
                        <p>Rating: {movie.vote_average.toFixed(1)}/10</p>
                    </div>
                    <p className={s.overview}>{movie.overview}</p>
                    <div className={s.metaInfo}>
                        <p><strong>Release Date:</strong> {movie.release_date}</p>
                        <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                        {movie.genres && (
                            <p><strong>Genres:</strong> {movie.genres.map((g: { id: number; name: string }) => g.name).join(', ')}</p>
                        )}
                        {movie.budget > 0 ? (
                            <p><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
                        ) : (
                            <p><strong>Budget:</strong> The budget is unknown</p>
                        )}
                    </div>
                </div>
            </div>

            {!isCreditsLoading && credits && credits.cast && (
                <CastSection cast={credits.cast} />
            )}

        </div>
    );
};