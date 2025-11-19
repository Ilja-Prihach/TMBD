
import {Link,  useLocation} from 'react-router'
import s from './Header.module.css'
import {Logo} from "@/common/components/Logo/Logo.tsx";
import {useAppDispatch, useAppSelector} from "@/app/model/store/hooks.ts";
import {selectIsDark, toggleTheme} from "@/app/model/store/theme/theme.slice.ts";
import {BurgerMenu} from "@/common/components/BurgerMenu/BurgerMenu.tsx";

import {UserMenu} from "@/common/components/UserMenu/UserMenu.tsx";

const navItems = [
  { to: '/', label: 'Main' },
  { to: '/category/popular', label: 'Category Movies' },
  { to: '/search', label: 'Search' },
  { to: '/favorites', label: 'Favorites' },
];

export const Header = () => {
  const location = useLocation();
  const isDark = useAppSelector(selectIsDark)
  const dispatch = useAppDispatch()

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
                  <Link
                      to={item.to}
                      className={`${s.link} ${
                          location.pathname === item.to ? s.activeLink : ''
                      }`}
                  >
                    {item.label}
                  </Link>
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
          <BurgerMenu />
          <div className={s.userMenuDesktop}>
            <UserMenu />
          </div>
        </nav>
      </header>
  );
};

