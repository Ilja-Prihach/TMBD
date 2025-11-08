import { useGetGenresQuery } from '@/features/movies/api/moviesApi';
import s from './GenresFilter.module.css';

type Genre = {
    id: number;
    name: string;
};

type GenresFilterProps = {
    selectedGenres: number[];
    onGenreToggle: (genreId: number) => void;
};

export const GenresFilter = ({ selectedGenres, onGenreToggle }: GenresFilterProps) => {
    const { data: genresData } = useGetGenresQuery();
    const genres: Genre[] = genresData?.genres || [];

    return (
        <div className={s.filterGroup}>
            <label className={s.label}>Genres</label>
            <div className={s.genres}>
                {genres.map(genre => (
                    <button
                        key={genre.id}
                        className={`${s.genreButton} ${
                            selectedGenres.includes(genre.id) ? s.active : ''
                        }`}
                        onClick={() => onGenreToggle(genre.id)}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>
        </div>
    );
};