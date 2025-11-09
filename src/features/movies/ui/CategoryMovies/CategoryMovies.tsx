
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
    useGetPopularMoviesQuery,
    useGetTopRatedQuery,
    useGetUpcomingQuery,
    useGetNowPlayingQuery,
} from '@/features/movies/api/moviesApi';
import { Pagination } from '@/common/components/Pagination/Pagination';
import { MovieCard } from '@/common/components/MovieCard/MovieCard';
import s from './CategoryMovies.module.css';
import {CategoryTabs} from "@/features/movies/ui/CategoryMovies/CategoryTabs/CategoryTabs.tsx";

const categories = ['popular', 'top_rated', 'upcoming', 'now_playing'];

export const CategoryMovies = () => {
    const { type } = useParams<{ type?: string }>();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    // Определяем текущую категорию (по умолчанию popular)
    const currentCategory = type && categories.includes(type) ? type : 'popular';

    // Используем соответствующий хук для текущей категории
    const getQueryHook = () => {
        switch (currentCategory) {
            case 'popular':
                return useGetPopularMoviesQuery;
            case 'top_rated':
                return useGetTopRatedQuery;
            case 'upcoming':
                return useGetUpcomingQuery;
            case 'now_playing':
                return useGetNowPlayingQuery;
            default:
                return useGetPopularMoviesQuery;
        }
    };

    const QueryHook = getQueryHook();
    const { data, isLoading, isError } = QueryHook(currentPage);

    // Сбрасываем пагинацию при смене категории
    useEffect(() => {
        setCurrentPage(1);
    }, [currentCategory]);

    // Редирект если категория невалидная
    useEffect(() => {
        if (type && !categories.includes(type)) {
            navigate('/category/popular', { replace: true });
        }
    }, [type, navigate]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const movies = data?.results || [];
    const totalPages = Math.min(data?.total_pages || 1, 500);

    if (isError) {
        return (
            <div className={s.container}>
                <div className={s.error}>Error loading movies. Please try again.</div>
            </div>
        );
    }

    return (
        <div className={s.container}>
            <CategoryTabs currentCategory={currentCategory} />

            {isLoading ? (
                <div className={s.loading}>Loading movies...</div>
            ) : movies.length === 0 ? (
                <div className={s.noResults}>
                    <h3>No movies found</h3>
                    <p>Try another category.</p>
                </div>
            ) : (
                <>
                    <div className={s.moviesGrid}>
                        {movies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
};