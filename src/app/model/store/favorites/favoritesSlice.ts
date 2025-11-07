import {createSlice, type PayloadAction} from '@reduxjs/toolkit'

export type FavoriteMovie = {
    id: number
    title: string
    poster_path: string | null
    vote_average: number
    release_date: string
}

type FavoritesState = {
    movies: FavoriteMovie[]
}


const loadFromStorage = () : FavoriteMovie[] => {
    try {
        const stored = localStorage.getItem('favoriteMovies')
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

const initialState: FavoritesState = {
    movies: loadFromStorage()
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<FavoriteMovie>) => {
            const existingMovie = state.movies.find(movie => movie.id === action.payload.id)
            if (!existingMovie) {
                state.movies.push(action.payload)
                localStorage.setItem('favoriteMovies', JSON.stringify(state.movies))
            }
        },
        removeFromFavorites: (state, action: PayloadAction<number>) => {
            state.movies = state.movies.filter(movie => movie.id !== action.payload)
            localStorage.setItem('favoriteMovies', JSON.stringify(state.movies))
        },
        toggleFavorite: (state, action: PayloadAction<FavoriteMovie>) => {
            const existingIndex = state.movies.findIndex(movie => movie.id === action.payload.id)

            if (existingIndex !== -1) {
                state.movies.splice(existingIndex, 1)
            } else {
                state.movies.push(action.payload)
            }

            localStorage.setItem('favoriteMovies', JSON.stringify(state.movies))
        },
    },
})

export const { addToFavorites, removeFromFavorites, toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
