
import {useGetPopularMoviesQuery} from "@/features/movies/api/moviesApi.ts";
import {useEffect, useState} from "react";
import {imageUrls} from "@/common/utils/image.utils.ts";
import s from "./HeroSection.module.css"
import {SearchBox} from "@/common/components/SearchBox/SearchBox.tsx";

export const HeroSection = () => {
    const { data: popularMovies } = useGetPopularMoviesQuery(1);
    const [randomBackdrop, setRandomBackdrop] = useState('');

    useEffect(() => {
        if (popularMovies?.results) {
            const moviesWithBackdrop = popularMovies.results.filter(movie => movie.backdrop_path);
            if (moviesWithBackdrop.length > 0) {
                const randomMovie = moviesWithBackdrop[
                    Math.floor(Math.random() * moviesWithBackdrop.length)
                    ];
                setRandomBackdrop(imageUrls.backdrop(randomMovie.backdrop_path));
            }
        }
    }, [popularMovies]);

    return (
        <section
            className={s.hero}
            style={{
                backgroundImage: randomBackdrop
                    ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${randomBackdrop})`
                    : 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))'
            }}
        >
            <div className={s.container}>
                <div className={s.content}>
                    <h1 className={s.title}>Welcome to MovieDB</h1>
                    <p className={s.subtitle}>
                        Discover millions of movies, TV shows and people. Explore now.
                    </p>

                    <SearchBox
                        placeholder="Search for a movie..."
                    />
                </div>
            </div>
        </section>
    );
};