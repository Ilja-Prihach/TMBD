import { useState } from 'react';

import s from './MovieFilters.module.css';
import {SortFilter} from "@/common/components/MovieFilters/SortFilter/SortFilter.tsx";
import {RatingFilter} from "@/common/components/MovieFilters/RatingFilter/RatingFilter.tsx";
import {GenresFilter} from "@/common/components/MovieFilters/GenresFilter/GenresFilter.tsx";

type FilterState = {
    sort_by: string;
    vote_average: {
        gte: number;
        lte: number;
    };
    with_genres: number[];
    page: number;
};

type MovieFiltersProps = {
    onFiltersChange: (filters: FilterState) => void;
};

export const MovieFilters = ({ onFiltersChange }: MovieFiltersProps) => {
    const [filters, setFilters] = useState<FilterState>({
        sort_by: 'popularity.desc',
        vote_average: { gte: 0, lte: 10 },
        with_genres: [],
        page: 1,
    });

    const handleSortChange = (value: string) => {
        const newFilters = { ...filters, sort_by: value, page: 1 };
        setFilters(newFilters);
        onFiltersChange(newFilters);
    };

    const handleRatingChange = (type: 'gte' | 'lte', value: number) => {
        const newRating = { ...filters.vote_average, [type]: value };
        const newFilters = { ...filters, vote_average: newRating, page: 1 };
        setFilters(newFilters);
        onFiltersChange(newFilters);
    };

    const handleGenreToggle = (genreId: number) => {
        const newGenres = filters.with_genres.includes(genreId)
            ? filters.with_genres.filter(id => id !== genreId)
            : [...filters.with_genres, genreId];

        const newFilters = { ...filters, with_genres: newGenres, page: 1 };
        setFilters(newFilters);
        onFiltersChange(newFilters);
    };

    const handleResetFilters = () => {
        const resetFilters: FilterState = {
            sort_by: 'popularity.desc',
            vote_average: { gte: 0, lte: 10 },
            with_genres: [],
            page: 1,
        };

        setFilters(resetFilters);
        onFiltersChange(resetFilters);
    };

    return (
        <div className={s.filters}>
            <div className={s.header}>
                <h3 className={s.title}>Filters</h3>
                <button
                    className={s.resetButton}
                    onClick={handleResetFilters}
                >
                    Reset All
                </button>
            </div>
            <SortFilter
                sortBy={filters.sort_by}
                onSortChange={handleSortChange}
            />
            <RatingFilter
                ratingRange={filters.vote_average}
                onRatingChange={handleRatingChange}
            />
            <GenresFilter
                selectedGenres={filters.with_genres}
                onGenreToggle={handleGenreToggle}
            />
        </div>
    );
};

export type { FilterState };