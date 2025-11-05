import { Path } from '@/common/routing'
import { NavLink } from 'react-router'
import s from './Header.module.css'
import {Logo} from "@/common/components/Logo/Logo.tsx";
import {useAppDispatch, useAppSelector} from "@/app/model/store/hooks.ts";
import {selectIsDark, toggleTheme} from "@/app/model/store/theme/theme.slice.ts";

const navItems = [
  { to: Path.Main, label: 'Main' },
  { to: Path.CategoryMovies, label: 'Category Movies' },
  { to: Path.FilteredMovies, label: 'Filtered Movies' },
  { to: Path.Search, label: 'Search' },
  { to: Path.Favorites, label: 'Favorites' },
]

export const Header = () => {
  const dispatch = useAppDispatch()
  const isDark = useAppSelector(selectIsDark)

  const handleThemeToggle = () => {
    dispatch(toggleTheme())
  }

  return (
      <header className={s.container}>
        <nav>
          <Logo size="medium" />
          <ul className={s.list}>
            {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                      to={item.to}
                      className={({ isActive }) => `${s.link} ${isActive ? s.activeLink : ''}`}
                  >
                    {item.label}
                  </NavLink>
                </li>
            ))}
          </ul>
          <button
              className={s.themeToggle}
              onClick={handleThemeToggle}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </nav>
      </header>
  )
}