import s from './SimilarMovies.module.css';
import {MovieCard} from "@/common/components/MovieCard/MovieCard.tsx";

type Movie = {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
    release_date: string;
};

type SimilarMoviesProps = {
    movies: Movie[];
};

export const SimilarMovies = ({ movies }: SimilarMoviesProps) => {
    const similarMovies = movies.slice(0, 6)

    if (similarMovies.length === 0) {
        return null;
    }

    return (
        <section className={s.similarSection}>
            <h2 className={s.title}>Similar Movies</h2>
            <div className={s.moviesGrid}>
                {similarMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    );
};