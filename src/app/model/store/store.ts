// src/store/store.ts
import { moviesApi } from '@/features/movies/api/moviesApi.ts'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import themeReducer from './theme/theme.slice'
import favoritesReducer from "@/app/model/store/favorites/favoritesSlice.ts";
import {authReducer} from "@/features/auth/store/auth.slice.ts";



export const store = configureStore({
  reducer: {
    theme: themeReducer,
    favorites: favoritesReducer,
    auth: authReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(moviesApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch