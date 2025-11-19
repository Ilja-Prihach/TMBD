
import { logout } from '@/features/auth/store/auth.slice';
import s from './UserMenu.module.css';
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "@/app/model/store/hooks.ts";
import {useEffect, useRef, useState} from "react";

export const UserMenu = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        setIsOpen(false);
        navigate('/');
    };

    const handleFavorites = () => {
        navigate('/favorites');
        setIsOpen(false);
    };

    const handleProfile = () => {
        navigate('/profile');
        setIsOpen(false);
    };

    const handleSettings = () => {
        navigate('/settings');
        setIsOpen(false);
    };

    const handleReviews = () => {
        navigate('/reviews');
        setIsOpen(false);
    };

    if (!isAuthenticated) {
        return (
            <div className={s.authButtons}>
                <button
                    className={s.loginButton}
                    onClick={() => navigate('/login')}
                >
                    Sign In
                </button>
            </div>
        );
    }

    return (
        <div className={s.userMenu} ref={dropdownRef}>
            <button
                className={s.userButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                <img
                    src={user?.avatar}
                    alt={user?.username}
                    className={s.avatar}
                />
                <span className={s.username}>{user?.username}</span>
                <span className={`${s.arrow} ${isOpen ? s.arrowOpen : ''}`}>▼</span>
            </button>

            {isOpen && (
                <div className={s.dropdown}>
                    <div className={s.userInfo}>
                        <img src={user?.avatar} alt={user?.username} className={s.dropdownAvatar} />
                        <div>
                            <div className={s.dropdownUsername}>{user?.username}</div>
                            <div className={s.dropdownEmail}>{user?.email}</div>
                        </div>
                    </div>

                    <div className={s.stats}>
                        <div className={s.stat}>
                            <span className={s.statNumber}>{user?.watchlistCount || 0}</span>
                            <span className={s.statLabel}>Favorites</span>
                        </div>
                        <div className={s.stat}>
                            <span className={s.statNumber}>{user?.reviewsCount || 0}</span>
                            <span className={s.statLabel}>Reviews</span>
                        </div>
                    </div>

                    <div className={s.menuItems}>
                        <button className={s.menuItem} onClick={handleProfile}>
                            👤 My Profile
                        </button>
                        <button className={s.menuItem} onClick={handleFavorites}>
                            ❤️ My Favorites
                        </button>
                        <button className={s.menuItem} onClick={handleReviews}>
                            📝 My Reviews
                        </button>
                        <button className={s.menuItem} onClick={handleSettings}>
                            ⚙️ Settings
                        </button>
                        <div className={s.divider}></div>
                        <button className={s.menuItem} onClick={handleLogout}>
                            🚪 Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};