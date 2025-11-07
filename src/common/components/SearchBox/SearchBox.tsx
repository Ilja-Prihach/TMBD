import { useState,} from 'react';
import { useNavigate } from 'react-router';
import s from './SearchBox.module.css';

export const SearchBox = ({
                              placeholder = "Search for a movie...",
                              className = ""
                          }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleClear = () => {
        setSearchQuery('');
        navigate('/search');
    };

    const isSearchDisabled = !searchQuery.trim();
    const showClearButton = searchQuery.length > 0;

    return (
        <form onSubmit={handleSearch} className={`${s.searchForm} ${className}`}>
            <div className={s.searchBox}>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={s.searchInput}
                />

                {showClearButton && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className={s.clearButton}
                        aria-label="Clear search"
                    >
                        ×
                    </button>
                )}

                <button
                    type="submit"
                    disabled={isSearchDisabled}
                    className={s.searchButton}
                >
                    Search
                </button>
            </div>
        </form>
    );
};