
import {useNavigate} from "react-router";
import {imageUrls} from "@/utils/image.utils.ts";
import s from "./MovieCard.module.css"
import {useFavorites} from "@/utils/useFavorites.ts";

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

export const MovieCard = ({ movie }: MovieCardProps) => {
    const navigate = useNavigate();
    const {toggleFavorite, isFavorite} = useFavorites()

    const handleClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        const favoriteMovie = {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            release_date: movie.release_date,
        };

        toggleFavorite(favoriteMovie);
    };

    const getRatingColor = (rating: number) => {
        if (rating >= 8) return '#46d369';
        if (rating >= 6) return '#ffa500';
        return '#e50914';
    };

    const getYear = (releaseDate?: string) => {
        return releaseDate ? new Date(releaseDate).getFullYear() : 'TBA';
    };

    const getPosterUrl = (): string => {
        if (!movie.poster_path) {
            return `https://placehold.co/342x500/2d2d2d/ffffff?text=No+Poster&font=montserrat`;
        }
        return imageUrls.poster(movie.poster_path, 'w342');
    };

    return (
        <div className={s.card} onClick={handleClick}>
            <div className={s.posterContainer}>
                <img
                    src={getPosterUrl()}
                    alt={movie.title}
                    className={s.poster}
                    onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/342x500/2d2d2d/ffffff?text=Error+Loading&font=montserrat';
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
                    aria-label={isFavorite(movie.id) ? "Remove from favorites" : "Add to favorites"}
                >
                    {isFavorite(movie.id) ? '❤️' : '♡'}
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