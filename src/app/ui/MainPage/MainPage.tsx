import {HeroSection} from "@/common/components/HeroSection/HeroSection.tsx";
import {MoviesSection} from "@/common/components/MoviesSection/MoviesSection.tsx";
import s from "./MainPage.module.css"


export const MainPage = () => {



    return (
        <section>
          <HeroSection/>
            <div className={s.section}>
                <MoviesSection category="popular" />
                <MoviesSection category="top_rated" />
                <MoviesSection category="upcoming" />
                <MoviesSection category="now_playing" />
            </div>
        </section>
    )
}
