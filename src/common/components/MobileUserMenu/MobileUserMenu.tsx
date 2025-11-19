import s from './MobileUserMenu.module.css';
import { useAppSelector, useAppDispatch } from "@/app/model/store/hooks.ts";
import { logout } from '@/features/auth/store/auth.slice';
import { useNavigate } from "react-router";

interface MobileUserMenuProps {
    onClose: () => void;
}

export const MobileUserMenu = ({ onClose }: MobileUserMenuProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);

    const handleLogin = () => {
        navigate('/login');
        onClose();
    };

    const handleLogout = () => {
        dispatch(logout());
        onClose();
        navigate('/');
    };

    const handleFavorites = () => {
        navigate('/favorites');
        onClose();
    };

    const handleProfile = () => {
        navigate('/profile');
        onClose();
    };

    const handleSettings = () => {
        navigate('/settings');
        onClose();
    };

    const handleReviews = () => {
        navigate('/reviews');
        onClose();
    };

    if (!isAuthenticated) {
        return (
            <div className={s.authSection}>
                <div className={s.authButtons}>
                    <button
                        className={s.loginButton}
                        onClick={handleLogin}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={s.userSection}>
            <div className={s.userInfo}>
                <img
                    src={user?.avatar}
                    alt={user?.username}
                    className={s.userAvatar}
                />
                <div className={s.userDetails}>
                    <div className={s.userName}>{user?.username}</div>
                    <div className={s.userEmail}>{user?.email}</div>
                </div>
            </div>

            <div className={s.userStats}>
                <div className={s.stat}>
                    <span className={s.statNumber}>{user?.watchlistCount || 0}</span>
                    <span className={s.statLabel}>Favorites</span>
                </div>
                <div className={s.stat}>
                    <span className={s.statNumber}>{user?.reviewsCount || 0}</span>
                    <span className={s.statLabel}>Reviews</span>
                </div>
            </div>

            <div className={s.userMenuItems}>
                <button className={s.userMenuItem} onClick={handleProfile}>
                    👤 My Profile
                </button>
                <button className={s.userMenuItem} onClick={handleFavorites}>
                    ❤️ My Favorites
                </button>
                <button className={s.userMenuItem} onClick={handleReviews}>
                    📝 My Reviews
                </button>
                <button className={s.userMenuItem} onClick={handleSettings}>
                    ⚙️ Settings
                </button>
                <div className={s.divider}></div>
                <button className={s.userMenuItem} onClick={handleLogout}>
                    🚪 Sign Out
                </button>
            </div>
        </div>
    );
};