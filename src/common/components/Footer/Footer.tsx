import {Logo} from "@/common/components/Logo/Logo.tsx";
import s from './Footer.module.css';
import {GitHubIcon, LinkedinIcon, TelegramIcon} from "@/accets/socialLogo";


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
                    <a
                        href="https://www.linkedin.com/in/ilja-prihach-298204172"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={s.socialLink}
                    >
                        <LinkedinIcon />
                        <span>LinkedIn</span>
                    </a>
                    <a
                        href="https://github.com/Ilja-Prihach"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={s.socialLink}
                    >
                        <GitHubIcon />
                        <span>GitHub</span>
                    </a>
                    <a
                        href="https://t.me/Ilja_prihach"
                       target="_blank"
                       rel="noopener noreferrer"
                       className={s.socialLink}
                    >
                        <TelegramIcon />
                        <span>Telegram</span>
                    </a>
                </div>
            </div>
        </footer>
    )
}