import { NavLink, useParams } from 'react-router';
import s from './CategoryTabs.module.css';

type CategoryTabsProps = {
    currentCategory: string;
};

const categories = [
    { key: 'popular', label: 'Popular' },
    { key: 'top_rated', label: 'Top Rated' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'now_playing', label: 'Now Playing' },
];

export const CategoryTabs = ({ currentCategory }: CategoryTabsProps) => {
    const { type } = useParams<{ type?: string }>();

    const getCategoryTitle = () => {
        const category = categories.find(cat => cat.key === currentCategory);
        return category ? `${category.label} Movies` : 'Movies';
    };

    return (
        <div className={s.tabsContainer}>
            <h1 className={s.title}>{getCategoryTitle()}</h1>

            <nav className={s.tabs}>
                {categories.map(category => (
                    <NavLink
                        key={category.key}
                        to={`/category/${category.key}`}
                        className={({ isActive }) =>
                            `${s.tab} ${(isActive || (!type && category.key === 'popular')) ? s.active : ''}`
                        }
                    >
                        {category.label}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};