import {useNavigate} from "react-router";
import {useGetPopularMoviesQuery} from "@/features/movies/api/moviesApi.ts";
import {useEffect, useState} from "react";
import {imageUrls} from "@/utils/image.utils.ts";
import s from "./HeroSection.module.css"

export const HeroSection = () => {

    const navigate = useNavigate();
    const { data: popularMovies } = useGetPopularMoviesQuery(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [randomBackdrop, setRandomBackdrop] = useState<string>('');

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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const isSearchDisabled = !searchQuery.trim();



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

                    <form onSubmit={handleSearch} className={s.searchForm}>
                        <div className={s.searchBox}>
                            <input
                                type="text"
                                placeholder="Search for a movie..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={s.searchInput}
                            />
                            <button
                                type="submit"
                                disabled={isSearchDisabled}
                                className={s.searchButton}
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};
