
import s from './MovieInfo.module.css';

type MovieInfoProps = {
    movie: {
        title: string;
        tagline?: string;
        poster_path: string | null;
        vote_average: number;
        overview: string;
        release_date: string;
        runtime: number;
        genres: { id: number; name: string }[];
        budget: number;
    };
};

export const MovieInfo = ({ movie }: MovieInfoProps) => {
    const getRatingColor = (rating: number) => {
        if (rating >= 8) return '#46d369';
        if (rating >= 6) return '#ffa500';
        return '#e50914';
    };

    const getYear = (releaseDate: string) => {
        return new Date(releaseDate).getFullYear();
    };

    const getRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const getPosterUrl = () => {
        if (!movie.poster_path) {
            return 'https://placehold.co/500x750/2d2d2d/ffffff?text=No+Poster';
        }
        return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    };

    return (
        <>
            <div className={s.movieHeader}>
                <h1 className={s.title}>{movie.title}</h1>
                {movie.tagline && <p className={s.tagline}>{movie.tagline}</p>}
            </div>

            <div className={s.movieContent}>
                <div className={s.posterSection}>
                    <img
                        src={getPosterUrl()}
                        alt={movie.title}
                        className={s.poster}
                    />
                </div>

                <div className={s.detailsSection}>
                    <div
                        className={s.rating}
                        style={{ backgroundColor: getRatingColor(movie.vote_average) }}
                    >
                        {movie.vote_average.toFixed(1)}
                    </div>

                    <div className={s.overview}>
                        <h3>Overview</h3>
                        <p>{movie.overview}</p>
                    </div>

                    <div className={s.metaInfo}>
                        <p><strong>Release Date:</strong> {movie.release_date} ({getYear(movie.release_date)})</p>
                        <p><strong>Runtime:</strong> {getRuntime(movie.runtime)}</p>
                        {movie.genres && (
                            <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
                        )}
                        {movie.budget > 0 ? (
                            <p><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
                        ) : (
                            <p><strong>Budget:</strong> The budget is unknown</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};