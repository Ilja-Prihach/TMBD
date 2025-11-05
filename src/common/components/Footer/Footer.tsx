import {Logo} from "@/common/components/Logo/Logo.tsx";
import s from './Footer.module.css';


export const Footer = () => {
    return (
        <footer className={s.footer}>
            <div className={s.container}>
                <div className={s.main}>
                    <Logo size="small" />
                </div>
                <div className={s.text}>
                    <p>
                        © 2025 Kinopoisk Demo · Data courtesy of TMDB.
                    </p>
                </div>
                <div className={s.social}>
                    <a href="#">Twitter</a>
                    <a href="#">GitHub</a>
                    <a href="#">Telegram</a>
                </div>
            </div>
        </footer>
    )
}