
export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: (page = 1) => `movie/popular?page=${page}`,
    }),
    searchMovies: builder.query({
      query: ({ query, page = 1 }) => `search/movie?query=${query}&page=${page}`,
    }),
    getTopRated: builder.query({
      query: (page = 1) => `movie/top_rated?page=${page}`,
    }),
    getUpcoming: builder.query({
      query: (page = 1) => `movie/upcoming?page=${page}`,
    }),
    getNowPlaying: builder.query({
      query: (page = 1) => `movie/now_playing?page=${page}`,
    }),
  }),
});

export const {useGetPopularMoviesQuery, useSearchMoviesQuery, useGetTopRatedQuery, useGetUpcomingQuery, useGetNowPlayingQuery} = moviesApi;