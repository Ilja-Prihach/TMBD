import {HeroSection} from "@/common/components/HeroSection/HeroSection.tsx";
import {MoviesSection} from "@/common/components/MoviesSection/MoviesSection.tsx";
import s from "./MainPage.module.css"
import {useFirstLoad} from "@/common/hooks/useFirstLoad.ts";
import {MainPageSkeleton} from "@/common/components/MainPageSkeleton/MainPageSkeleton.tsx";


export const MainPage = () => {
    const isFirstLoad = useFirstLoad();


    if (isFirstLoad) {
        return <MainPageSkeleton />;
    }



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
