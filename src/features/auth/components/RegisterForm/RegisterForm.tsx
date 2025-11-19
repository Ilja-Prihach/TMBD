
import s from './RegisterForm.module.css';
import {useAppDispatch, useAppSelector} from "@/app/model/store/hooks.ts";
import {Link, useNavigate} from "react-router";
import {useState} from "react";
import {clearError, registerFailure, registerStart, registerSuccess} from "@/features/auth/store/auth.slice.ts";

export const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useAppSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    type StoredUser = {
        email: string;
        username: string;
        password: string;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearError());

        // Validation
        if (formData.password !== formData.confirmPassword) {
            dispatch(registerFailure('Passwords do not match'));
            return;
        }
        if (formData.password.length < 6) {
            dispatch(registerFailure('Password must be at least 6 characters'));
            return;
        }
        if (formData.username.length < 3) {
            dispatch(registerFailure('Username must be at least 3 characters'));
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            dispatch(registerFailure('Please enter a valid email address'));
            return;
        }

        dispatch(registerStart());

        // Имитация API запроса
        setTimeout(() => {
            // Проверка существующего пользователя
            const existingUsers = JSON.parse(localStorage.getItem('movieAppUsers') || '[]');
            const userExists = existingUsers.some((user: StoredUser) =>
                user.email === formData.email || user.username === formData.username
            );

            if (userExists) {
                dispatch(registerFailure('User with this email or username already exists'));
                return;
            }

            // Сохраняем пользователя в "базу"
            const newUser = {
                email: formData.email,
                username: formData.username,
                password: formData.password
            };
            localStorage.setItem('movieAppUsers', JSON.stringify([...existingUsers, newUser]));

            // Создаем полный профиль
            const userProfile = {
                id: Math.random().toString(36).substr(2, 9),
                email: formData.email,
                username: formData.username,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.username)}&background=01B4E4&color=fff&bold=true&size=128`,
                joinDate: new Date().toISOString(),
                favoriteGenres: [],
                watchlistCount: 0,
                reviewsCount: 0,
            };

            dispatch(registerSuccess(userProfile));
            navigate('/');
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className={s.container}>
            <div className={s.card}>
                <div className={s.header}>
                    <div className={s.logo}>🎬</div>
                    <h1 className={s.title}>Join MovieDB</h1>
                    <p className={s.subtitle}>Create your account to save favorites and get personalized recommendations</p>
                </div>

                <form onSubmit={handleSubmit} className={s.form}>
                    {error && (
                        <div className={s.error}>
                            <span className={s.errorIcon}>⚠️</span>
                            {error}
                        </div>
                    )}

                    <div className={s.inputGroup}>
                        <label className={s.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={s.input}
                            placeholder="your@email.com"
                        />
                    </div>

                    <div className={s.inputGroup}>
                        <label className={s.label}>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className={s.input}
                            placeholder="Choose a username"
                        />
                    </div>

                    <div className={s.inputGroup}>
                        <label className={s.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className={s.input}
                            placeholder="At least 6 characters"
                        />
                    </div>

                    <div className={s.inputGroup}>
                        <label className={s.label}>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className={s.input}
                            placeholder="Repeat your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className={s.button}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <div className={s.spinner}></div>
                                Creating Account...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                <div className={s.footer}>
                    <p className={s.loginText}>
                        Already have an account?{' '}
                        <Link to="/login" className={s.loginLink}>
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
