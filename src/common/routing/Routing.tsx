import { MainPage } from '@/app/ui/MainPage/MainPage.tsx'
import { Route, Routes } from 'react-router'
import {PageNotFound} from "@/common/components";
import {CategoryMovies} from "@/features/movies/ui/CategoryMovies/CategoryMovies.tsx";
import {Favorites} from "@/features/movies/ui/Favorites/Favorites.tsx";
import {Search} from "@/features/movies/ui/Search/Search.tsx";
import {FilteredMovies} from "@/features/movies/ui/FilteredMovies/FilteredMovies.tsx";
import {MovieDetails} from "@/features/movies/ui/MovieDetails/MovieDetails.tsx";

export const Path = {
  Main: '/',
  CategoryMovies: '/category',
  FilteredMovies: '/filtered',
  Favorites: '/favorites',
  Search: '/search',
  MovieDetails: '/movie/:id',
  NotFound: '*',
} as const

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<MainPage />} />
    <Route path={Path.CategoryMovies} element={<CategoryMovies />} />
    <Route path={Path.Favorites} element={<Favorites />} />
    <Route path={Path.Search} element={<Search />} />
    <Route path={Path.FilteredMovies} element={<FilteredMovies/>}/>
    <Route path={Path.MovieDetails} element={<MovieDetails />} />
    <Route path={Path.NotFound} element={<PageNotFound />} />
  </Routes>
)
