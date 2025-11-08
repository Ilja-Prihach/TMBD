import s from './SortFilter.module.css';

type SortFilterProps = {
    sortBy: string;
    onSortChange: (value: string) => void;
};

const sortOptions = [
    { value: 'popularity.desc', label: 'Popularity (Descending)' },
    { value: 'popularity.asc', label: 'Popularity (Ascending)' },
    { value: 'vote_average.desc', label: 'Rating (Descending)' },
    { value: 'vote_average.asc', label: 'Rating (Ascending)' },
    { value: 'release_date.desc', label: 'Release Date (Descending)' },
    { value: 'release_date.asc', label: 'Release Date (Ascending)' },
    { value: 'title.asc', label: 'Title (A-Z)' },
    { value: 'title.desc', label: 'Title (Z-A)' },
];

export const SortFilter = ({ sortBy, onSortChange }: SortFilterProps) => {
    return (
        <div className={s.filterGroup}>
            <label className={s.label}>Sort By</label>
            <select
                className={s.select}
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
            >
                {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};