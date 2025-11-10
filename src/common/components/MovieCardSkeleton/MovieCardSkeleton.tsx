import s from './MovieCardSkeleton.module.css';

type MovieCardSkeletonProps = {
    count?: number;
};

export const MovieCardSkeleton = ({ count = 6 }: MovieCardSkeletonProps) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className={s.skeletonCard}>
                    <div className={s.skeletonPoster}></div>
                    <div className={s.skeletonTitle}></div>
                    <div className={s.skeletonRating}></div>
                </div>
            ))}
        </>
    );
};