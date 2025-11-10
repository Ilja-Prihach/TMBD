import s from './MoviesSection.module.css';
import {MovieCard} from "@/common/components/MovieCard/MovieCard.tsx";
import {useNavigate} from "react-router";
import {sectionConfig} from "@/utils/moviesSectionConfig.ts";
import {Button} from "@/common/components/BackButton/Button.tsx";
import {MovieCardSkeleton} from "@/common/components/MovieCardSkeleton/MovieCardSkeleton.tsx";
import {useMoviesSectionData} from "@/common/hooks/useMoviesSectionData.ts";

type MoviesSectionProps = {
    category: 'popular' | 'top_rated' | 'upcoming' | 'now_playing';
};

export const MoviesSection = ({ category }: MoviesSectionProps) => {
    const navigate = useNavigate();
    const { data, isLoading } = useMoviesSectionData(category);

    const config = sectionConfig[category];
    const movies = data?.results || [];

    const handleViewMore = () => {
        navigate(`/category/${category}`);
    };

    if (isLoading) {
        return (
            <section className={s.section}>
                <div className={s.header}>
                    <h2 className={s.title}>{config.title}</h2>
                </div>
                <div className={s.moviesGrid}>
                    <MovieCardSkeleton count={6} />
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
                <Button
                    variant="primary"
                    size="medium"
                    onClick={handleViewMore}
                >
                    View More
                </Button>
            </div>

            <div className={s.moviesGrid}>
                {displayedMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    );
};
