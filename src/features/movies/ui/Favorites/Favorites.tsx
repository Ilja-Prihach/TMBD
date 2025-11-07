import {useFavorites} from "@/utils/useFavorites.ts";
import {MovieCard} from "@/common/components/MovieCard/MovieCard.tsx";
import s from "./Favorites.module.css"

export const Favorites = () => {
    const { favorites } = useFavorites();


    return (
        <div className={s.container}>
            <h1 className={s.title}>My Favorite Movies</h1>

            {favorites.length === 0 ? (
                <div className={s.emptyState}>
                    <p>You haven't added any movies to favorites yet.</p>
                    <p>Click the ♡ button on any movie to add it here!</p>
                </div>
            ) : (
                <>
                    <p className={s.count}>You have {favorites.length} favorite movie{favorites.length !== 1 ? 's' : ''}</p>
                    <div className={s.moviesGrid}>
                        {favorites.map(movie => (
                            <MovieCard
                                key={movie.id}
                                movie={{
                                    id: movie.id,
                                    title: movie.title,
                                    poster_path: movie.poster_path,
                                    vote_average: movie.vote_average,
                                    release_date: movie.release_date || ''
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};