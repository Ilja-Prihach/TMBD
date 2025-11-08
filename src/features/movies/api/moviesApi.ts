// src/features/movies/api/moviesApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import {baseQuery} from "@/app/api/base-api.ts";
import type {Genre, MoviesResponse} from "@/features/movies/api/moviesApi.types.ts";



export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery,
  tagTypes: ['Movies'],
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MoviesResponse, number | void>({
      query: (page = 1) => `movie/popular?page=${page}`,
      providesTags: ['Movies'],
    }),

    searchMovies: builder.query<MoviesResponse, { query: string; page?: number }>({
      query: ({ query, page = 1 }) => `search/movie?query=${encodeURIComponent(query)}&page=${page}`,
      providesTags: ['Movies'],
    }),

    getTopRated: builder.query<MoviesResponse, number | void>({
      query: (page = 1) => `movie/top_rated?page=${page}`,
      providesTags: ['Movies'],
    }),

    getUpcoming: builder.query<MoviesResponse, number | void>({
      query: (page = 1) => `movie/upcoming?page=${page}`,
      providesTags: ['Movies'],
    }),

    getNowPlaying: builder.query<MoviesResponse, number | void>({
      query: (page = 1) => `movie/now_playing?page=${page}`,
      providesTags: ['Movies'],
    }),

    getMovieDetails: builder.query({
      query: (id: number) => `movie/${id}`,
    }),

    getMovieCredits: builder.query({
      query: (id: number) => `movie/${id}/credits`,
    }),

    getSimilarMovies: builder.query({
      query: (id: number) => `movie/${id}/similar`,
    }),

    getFilteredMovies: builder.query<MoviesResponse, {
      page?: number;
      sort_by?: string;
      'vote_average.gte'?: number;
      'vote_average.lte'?: number;
      with_genres?: string;
    }>({
      query: (filters = {}) => {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            params.append(key, value.toString())
          }
        })
        return `discover/movie?${params.toString()}`;
      },
      providesTags: ['Movies']
    }),

    getGenres: builder.query<{genres: Genre[]}, void>({
      query: () => 'genre/movie/list'
    })
  }),
});

export const {
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
  useGetTopRatedQuery,
  useGetUpcomingQuery,
  useGetNowPlayingQuery,
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetSimilarMoviesQuery,
  useGetFilteredMoviesQuery,
  useGetGenresQuery
} = moviesApi;