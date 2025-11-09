import s from './MainPageSkeleton.module.css';

export const MainPageSkeleton = () => {
    return (
        <div className={s.skeleton}>
            <div className={s.heroSkeleton}>
                <div className={s.heroContent}>
                    <div className={s.heroTitle}></div>
                    <div className={s.heroSubtitle}></div>
                    <div className={s.searchSkeleton}></div>
                </div>
            </div>

            <div className={s.sections}>
                {[...Array(4)].map((_, sectionIndex) => (
                    <div key={sectionIndex} className={s.section}>
                        <div className={s.sectionHeader}>
                            <div className={s.sectionTitle}></div>
                            <div className={s.viewMoreButton}></div>
                        </div>
                        <div className={s.moviesGrid}>
                            {[...Array(6)].map((_, movieIndex) => (
                                <div key={movieIndex} className={s.movieCard}>
                                    <div className={s.poster}></div>
                                    <div className={s.movieInfo}>
                                        <div className={s.movieTitle}></div>
                                        <div className={s.movieYear}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};