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
        // Login actions
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
            localStorage.setItem('movieAppUser', JSON.stringify(action.payload));
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Register actions
        registerStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        registerSuccess: (state, action: PayloadAction<User>) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
            localStorage.setItem('movieAppUser', JSON.stringify(action.payload));
        },
        registerFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Common actions
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('movieAppUser');
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    logout,
    clearError,
} = authSlice.actions;

export const authReducer = authSlice.reducer;