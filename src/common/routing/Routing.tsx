import { MainPage } from '@/app/ui/MainPage/MainPage.tsx'
import { Route, Routes } from 'react-router'
import {PageNotFound} from "@/common/components";
import {CategoryMovies} from "@/features/movies/ui/CategoryMovies/CategoryMovies.tsx";
import {Favorites} from "@/features/movies/ui/Favorites/Favorites.tsx";
import {Search} from "@/features/movies/ui/Search/Search.tsx";
import {FilteredMovies} from "@/features/movies/ui/FilteredMovies/FilteredMovies.tsx";
import {MovieDetails} from "@/features/movies/ui/MovieDetails/MovieDetails.tsx";
import {LoginForm} from "@/features/auth/components/LoginForm/LoginForm.tsx";
import {RegisterForm} from "@/features/auth/components/RegisterForm/RegisterForm.tsx";
import {ProtectedRoute} from "@/common/components/ProtectedRoute/ProtectedRoute.tsx";
import {ComingSoonPage} from "@/common/components/ComingSoonPage/ComingSoonPage.tsx";

export const Path = {
  Main: '/',
  CategoryMovies: '/category/:type?',
  FilteredMovies: '/filtered',
  Favorites: '/favorites',
  Search: '/search',
  MovieDetails: '/movie/:id',
  Login: '/login',
  Register: '/register',
  Profile: '/profile',
  Settings: '/settings',
  Reviews: '/reviews',
  NotFound: '*',
} as const

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<MainPage />} />
    <Route path={Path.CategoryMovies} element={<CategoryMovies />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route
          path="/favorites"
          element={
              <ProtectedRoute>
                  <Favorites />
              </ProtectedRoute>
          }
      />
    <Route path={Path.Search} element={<Search />} />
    <Route path={Path.FilteredMovies} element={<FilteredMovies/>}/>
    <Route path={Path.MovieDetails} element={<MovieDetails />} />
    <Route path={Path.NotFound} element={<PageNotFound />} />
    <Route path={Path.Profile} element={<ComingSoonPage title="My Profile" />} />
    <Route path={Path.Settings} element={<ComingSoonPage title="Settings" />} />
    <Route path={Path.Reviews} element={<ComingSoonPage title="My Reviews" />} />
  </Routes>
)
