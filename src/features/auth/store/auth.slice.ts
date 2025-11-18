import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

export type User = {
    id: string;
    email: string;
    username: string;
    avatar: string;
    joinDate: string;
    favoriteGenres: string[];
    watchlistCount: number;
    reviewsCount: number;
};

export type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
};

const generateAvatar = (username: string): string => {
    const colors = ['#01B4E4', '#90CEA1', '#0D253F', '#1C3B5E', '#2D4D6E'];
    const color = colors[username.length % colors.length];
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=${color.replace('#', '')}&color=fff&bold=true&size=128`;
};

const loadUserFromStorage = (): User | null => {
    try {
        const stored = localStorage.getItem('movieAppUser');
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
};

const initialState: AuthState = {
    user: loadUserFromStorage(),
    isAuthenticated: !!loadUserFromStorage(),
    isLoading: false,
    error: null,
};


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        registerSuccess: (state, action: PayloadAction<{ email: string; username: string; password: string }>) => {
            const { email, username } = action.payload;
            state.isLoading = false;
            state.user = {
                id: Math.random().toString(36).substr(2, 9),
                email,
                username,
                avatar: generateAvatar(username),
                joinDate: new Date().toISOString(),
                favoriteGenres: [],
                watchlistCount: 0,
                reviewsCount: 0,
            };
            state.isAuthenticated = true;
            state.error = null;
            localStorage.setItem('movieAppUser', JSON.stringify(state.user));
        },
        registerFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state) => {
            state.isLoading = false;
            const user = loadUserFromStorage();
            if (user) {
                state.user = user;
                state.isAuthenticated = true;
            }
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('movieAppUser');
            localStorage.removeItem('userFavorites');
        },
        updateProfile: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
                localStorage.setItem('movieAppUser', JSON.stringify(state.user));
            }
        },
        clearError: (state) => {
            state.error = null;
        },
    }
})

export const {
    registerStart,
    registerSuccess,
    registerFailure,
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    updateProfile,
    clearError,
} = authSlice.actions;

export const authReducer = authSlice.reducer;

