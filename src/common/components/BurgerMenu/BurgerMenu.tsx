
import { useState } from 'react';
import {NavLink} from 'react-router';
import { Path } from '@/common/routing';
import s from './BurgerMenu.module.css';
import {MobileUserMenu} from "@/common/components/MobileUserMenu/MobileUserMenu.tsx";


const navItems = [
    { to: Path.Main, label: 'Main' },
    { to: Path.CategoryMovies, label: 'Category Movies' },
    { to: Path.FilteredMovies, label: 'Filtered Movies' },
    { to: Path.Search, label: 'Search' },
    { to: Path.Favorites, label: 'Favorites' },
];

export const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className={s.burgerMenu}>
            <button
                className={`${s.burgerButton} ${isOpen ? s.active : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>


            {isOpen && (
                <div className={s.overlay} onClick={closeMenu}>
                    <nav className={s.menu} onClick={(e) => e.stopPropagation()}>
                        <ul className={s.menuList}>
                            {navItems.map((item) => (
                                <li key={item.to} className={s.menuItem}>
                                    <NavLink
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `${s.menuLink} ${isActive ? s.activeLink : ''}`
                                        }
                                        onClick={closeMenu}
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                            <MobileUserMenu onClose={closeMenu} />
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};