import s from './MoviesSection.module.css';
import {MovieCard} from "@/common/components/MovieCard/MovieCard.tsx";
import {useNavigate} from "react-router";
import {
    useGetNowPlayingQuery,
    useGetPopularMoviesQuery,
    useGetTopRatedQuery,
    useGetUpcomingQuery
} from "@/features/movies/api/moviesApi.ts";
import {sectionConfig} from "@/utils/moviesSectionConfig.ts";

type MoviesSectionProps = {
    category: 'popular' | 'top_rated' | 'upcoming' | 'now_playing';
};

export const MoviesSection = ({ category }: MoviesSectionProps) => {
    const navigate = useNavigate();

    // Вызываем все хуки на верхнем уровне
    const popularData = useGetPopularMoviesQuery(1);
    const topRatedData = useGetTopRatedQuery(1);
    const upcomingData = useGetUpcomingQuery(1);
    const nowPlayingData = useGetNowPlayingQuery(1);

    // Получаем конфигурацию для категории
    const config = sectionConfig[category];

    // Выбираем соответствующие данные для категории
    const getDataByCategory = () => {
        switch (category) {
            case 'popular': return popularData;
            case 'top_rated': return topRatedData;
            case 'upcoming': return upcomingData;
            case 'now_playing': return nowPlayingData;
            default: return popularData;
        }
    };

    const { data, isLoading } = getDataByCategory();
    const movies = data?.results || [];

    const handleViewMore = () => {
        navigate(config.viewMoreLink);
    };

    if (isLoading) {
        return (
            <section className={s.section}>
                <div className={s.header}>
                    <h2 className={s.title}>{config.title}</h2>
                </div>
                <div className={s.moviesGrid}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className={s.skeletonCard}>
                            <div className={s.skeletonPoster}></div>
                            <div className={s.skeletonTitle}></div>
                            <div className={s.skeletonRating}></div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (!movies || movies.length === 0) {
        return null;
    }

    const displayedMovies = movies.slice(0, 6);

    return (
        <section className={s.section}>
            <div className={s.header}>
                <h2 className={s.title}>{config.title}</h2>
                <button
                    className={s.viewMoreButton}
                    onClick={handleViewMore}
                >
                    View More
                </button>
            </div>

            <div className={s.moviesGrid}>
                {displayedMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    );
};
