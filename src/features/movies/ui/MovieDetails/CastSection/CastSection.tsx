
import { imageUrls } from '@/common/utils/image.utils.ts';
import s from './CastSection.module.css';

type CastMember = {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
};

type CastSectionProps = {
    cast: CastMember[];
};

export const CastSection = ({ cast }: CastSectionProps) => {
    const topCast = cast.slice(0, 6);

    if (topCast.length === 0) {
        return null;
    }

    const getProfileUrl = (profilePath: string | null): string => {
        if (!profilePath) {
            return 'https://placehold.co/300x450/2d2d2d/ffffff?text=No+Photo';
        }
        return imageUrls.profile(profilePath, 'w185');
    };

    return (
        <section className={s.castSection}>
            <h2 className={s.title}>Top Cast</h2>
            <div className={s.castGrid}>
                {topCast.map(actor => (
                    <div key={actor.id} className={s.actorCard}>
                        <img
                            src={getProfileUrl(actor.profile_path)}
                            alt={actor.name}
                            className={s.actorPhoto}
                            onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/300x450/2d2d2d/ffffff?text=No+Photo';
                            }}
                        />
                        <div className={s.actorInfo}>
                            <h3 className={s.actorName}>{actor.name}</h3>
                            <p className={s.actorCharacter}>{actor.character}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};