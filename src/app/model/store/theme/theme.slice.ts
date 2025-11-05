// src/store/theme/theme.slice.ts
import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
    isDark: boolean;
}

const getInitialTheme = (): boolean => {
    if (typeof window === 'undefined') return false;

    const saved = localStorage.getItem('tmdb-theme');
    if (saved) return JSON.parse(saved);

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const initialState: ThemeState = {
    isDark: getInitialTheme(),
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDark = !state.isDark;
            localStorage.setItem('tmdb-theme', JSON.stringify(state.isDark));
        },
        setTheme: (state, action: { payload: boolean }) => {
            state.isDark = action.payload;
            localStorage.setItem('tmdb-theme', JSON.stringify(state.isDark));
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;

export const selectIsDark = (state: { theme: ThemeState }) => state.theme.isDark;