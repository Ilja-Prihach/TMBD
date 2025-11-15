
import { useState } from 'react';
import { useNavigate } from 'react-router';
import s from './CategoryDropdown.module.css';

const categories = [
    { value: 'popular', label: 'Popular' },
    { value: 'top_rated', label: 'Top Rated' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'now_playing', label: 'Now Playing' },
];

type CategoryDropdownProps = {
    currentCategory?: string;
    onCategoryChange?: (category: string) => void;
    variant?: 'header' | 'page';
};

export const CategoryDropdown = ({
                                     currentCategory = 'popular',
                                     onCategoryChange,
                                     variant = 'page'
                                 }: CategoryDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleCategorySelect = (category: string) => {
        if (onCategoryChange) {
            onCategoryChange(category);
        } else {
            navigate(`/category/${category}`);
        }
        setIsOpen(false);
    };

    const currentCategoryLabel = categories.find(cat => cat.value === currentCategory)?.label || 'Popular';

    return (
        <div className={`${s.dropdown} ${s[variant]}`}>
            <button
                className={s.dropdownButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <span>{currentCategoryLabel}</span>
                <svg
                    className={`${s.arrow} ${isOpen ? s.open : ''}`}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                >
                    <path
                        fill="currentColor"
                        d="M8 11.4L2.6 6 4 4.6l4 4 4-4L13.4 6z"
                    />
                </svg>
            </button>

            {isOpen && (
                <>
                    <div className={s.overlay} onClick={() => setIsOpen(false)} />
                    <ul className={s.dropdownMenu} role="listbox">
                        {categories.map((category) => (
                            <li key={category.value} role="option">
                                <button
                                    className={`${s.menuItem} ${
                                        currentCategory === category.value ? s.active : ''
                                    }`}
                                    onClick={() => handleCategorySelect(category.value)}
                                >
                                    {category.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};