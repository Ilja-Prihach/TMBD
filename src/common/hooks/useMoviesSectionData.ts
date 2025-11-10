import {
    useGetNowPlayingQuery,
    useGetPopularMoviesQuery,
    useGetTopRatedQuery,
    useGetUpcomingQuery
} from "@/features/movies/api/moviesApi.ts";


type MovieCategory = 'popular' | 'top_rated' | 'upcoming' | 'now_playing';


export const useMoviesSectionData = (category: MovieCategory) => {

    const popularData = useGetPopularMoviesQuery(1);
    const topRatedData = useGetTopRatedQuery(1);
    const upcomingData = useGetUpcomingQuery(1);
    const nowPlayingData = useGetNowPlayingQuery(1);

    const getDataByCategory = () => {
        switch (category) {
            case 'popular':
                return popularData;
            case 'top_rated':
                return topRatedData;
            case 'upcoming':
                return upcomingData;
            case 'now_playing':
                return nowPlayingData;
            default:
                return popularData;
        }
    };

    return getDataByCategory();
};