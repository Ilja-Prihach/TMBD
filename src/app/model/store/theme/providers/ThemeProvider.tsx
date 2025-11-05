// src/providers/ThemeProvider.tsx
import { useEffect } from 'react'
import {useAppSelector} from "@/app/model/store/hooks.ts";
import {selectIsDark} from "@/app/model/store/theme/theme.slice.ts";


interface ThemeProviderProps {
    children: React.ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const isDark = useAppSelector(selectIsDark)

    useEffect(() => {
        const root = document.documentElement

        if (isDark) {
            root.setAttribute('data-theme', 'dark')
        } else {
            root.setAttribute('data-theme', 'light')
        }
    }, [isDark])

    return <>{children}</>
}