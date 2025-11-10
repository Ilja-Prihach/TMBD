import {
    addToFavorites,
    type FavoriteMovie,
    removeFromFavorites,
    toggleFavorite
} from "@/app/model/store/favorites/favoritesSlice.ts";
import type {RootState} from "@/app/model/store/store.ts";
import {useAppDispatch, useAppSelector} from "@/app/model/store/hooks.ts";

export const useFavorites = () => {
    const dispatch = useAppDispatch()
    const favorites = useAppSelector((state: RootState) => state.favorites.movies)

    const isFavorite = (movieId: number) => {
        return favorites.some(movie => movie.id === movieId)
    }

    return {
        favorites,
        addToFavorites: (movie: FavoriteMovie) => dispatch(addToFavorites(movie)),
        removeFromFavorites: (movieId: number) => dispatch(removeFromFavorites(movieId)),
        toggleFavorite: (movie: FavoriteMovie) => dispatch(toggleFavorite(movie)),
        isFavorite,
    }
}

