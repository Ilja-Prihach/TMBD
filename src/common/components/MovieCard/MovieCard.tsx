
import {useNavigate} from "react-router";
import {imageUrls} from "@/utils/image.utils.ts";
import s from "./MovieCard.module.css"

type Movie = {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
    release_date: string;
};

type MovieCardProps = {
    movie: Movie;
};

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log('Add to favorites:', movie.id);
    };

    const getRatingColor = (rating: number) => {
        if (rating >= 8) return '#46d369';
        if (rating >= 6) return '#ffa500';
        return '#e50914';
    };

    const getYear = (releaseDate: string) => {
        return releaseDate ? new Date(releaseDate).getFullYear() : 'TBA';
    };

    return (
        <div className={s.card} onClick={handleClick}>
            <div className={s.posterContainer}>
                <img
                    src={imageUrls.poster(movie.poster_path, 'w342')}
                    alt={movie.title}
                    className={s.poster}
                    onError={(e) => {
                        e.currentTarget.src = '/placeholder-poster.jpg';
                    }}
                />
                <div
                    className={s.rating}
                    style={{ backgroundColor: getRatingColor(movie.vote_average) }}
                >
                    {movie.vote_average.toFixed(1)}
                </div>
                <button
                    className={s.favoriteButton}
                    onClick={handleFavoriteClick}
                    aria-label="Add to favorites"
                >
                    ♡
                </button>
            </div>

            <div className={s.info}>
                <h3 className={s.title}>{movie.title}</h3>
                <p className={s.year}>
                    {getYear(movie.release_date)}
                </p>
            </div>
        </div>
    );
};