
import React, { useState } from 'react';
import { loginStart, loginSuccess, loginFailure, clearError } from '../../store/auth.slice';
import s from './LoginForm.module.css';
import {useAppDispatch, useAppSelector} from "@/app/model/store/hooks.ts";
import {Link, useNavigate} from "react-router";

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useAppSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearError());

        if (!formData.email || !formData.password) {
            dispatch(loginFailure('Please fill in all fields'));
            return;
        }

        dispatch(loginStart());

        // Имитация API запроса
        setTimeout(() => {
            // Проверка пользователя в "базе"
            const existingUsers = JSON.parse(localStorage.getItem('movieAppUsers') || '[]');
            const user = existingUsers.find((u: { email: string; password: string }) =>
                u.email === formData.email && u.password === formData.password
            );

            if (user) {
                // Создаем полный профиль пользователя
                const userProfile = {
                    id: Math.random().toString(36).substr(2, 9),
                    email: user.email,
                    username: user.username,
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=01B4E4&color=fff&bold=true&size=128`,
                    joinDate: new Date().toISOString(),
                    favoriteGenres: [],
                    watchlistCount: 0,
                    reviewsCount: 0,
                };

                dispatch(loginSuccess(userProfile));
                navigate('/');
            } else {
                dispatch(loginFailure('Invalid email or password'));
            }
        }, 1000);
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
                    <h1 className={s.title}>Welcome Back</h1>
                    <p className={s.subtitle}>Sign in to your account to continue</p>
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
                        <label className={s.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className={s.input}
                            placeholder="Enter your password"
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
                                Signing In...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className={s.footer}>
                    <p className={s.registerText}>
                        Don't have an account?{' '}
                        <Link to="/register" className={s.registerLink}>
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};