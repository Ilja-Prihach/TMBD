
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


    const currentCategory = type && categories.includes(type) ? type : 'popular';


    const popularQuery = useGetPopularMoviesQuery(currentPage, {
        skip: currentCategory !== 'popular'
    });
    const topRatedQuery = useGetTopRatedQuery(currentPage, {
        skip: currentCategory !== 'top_rated'
    });
    const upcomingQuery = useGetUpcomingQuery(currentPage, {
        skip: currentCategory !== 'upcoming'
    });
    const nowPlayingQuery = useGetNowPlayingQuery(currentPage, {
        skip: currentCategory !== 'now_playing'
    });


    const getActiveQuery = () => {
        switch (currentCategory) {
            case 'popular': return popularQuery;
            case 'top_rated': return topRatedQuery;
            case 'upcoming': return upcomingQuery;
            case 'now_playing': return nowPlayingQuery;
            default: return popularQuery;
        }
    };

    const { data, isLoading, isError, error } = getActiveQuery();


    useEffect(() => {
        setCurrentPage(1);
    }, [currentCategory]);

    // Редирект если категория невалидная
    useEffect(() => {
        if (type && !categories.includes(type)) {
            navigate('/category/popular', { replace: true });
        }
    }, [type, navigate]);


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    // Прокрутка вверх при смене страницы или категории
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, currentCategory]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const movies = data?.results || [];
    const totalPages = Math.min(data?.total_pages || 1, 500);


    if (isError) {
        console.error('CategoryMovies error:', error);
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
                <div className={s.loading}>Loading {currentCategory} movies...</div>
            ) : movies.length === 0 ? (
                <div className={s.noResults}>
                    <h3>No {currentCategory} movies found</h3>
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