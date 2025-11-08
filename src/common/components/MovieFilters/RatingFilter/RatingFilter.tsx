import { useState, useEffect } from 'react';
import s from './RatingFilter.module.css';

type RatingFilterProps = {
    ratingRange: {
        gte: number;
        lte: number;
    };
    onRatingChange: (type: 'gte' | 'lte', value: number) => void;
};

export const RatingFilter = ({ ratingRange, onRatingChange }: RatingFilterProps) => {
    const [ratingTimeout, setRatingTimeout] = useState<NodeJS.Timeout>();

    const handleRatingChangeWithDebounce = (type: 'gte' | 'lte', value: number) => {
        // Debounce для рейтинга
        if (ratingTimeout) clearTimeout(ratingTimeout);

        const timeout = setTimeout(() => {
            onRatingChange(type, value);
        }, 200);

        setRatingTimeout(timeout);
    };

    useEffect(() => {
        return () => {
            if (ratingTimeout) clearTimeout(ratingTimeout);
        };
    }, [ratingTimeout]);

    return (
        <div className={s.filterGroup}>
            <label className={s.label}>Rating Range</label>
            <div className={s.ratingInputs}>
                <div className={s.ratingInput}>
                    <span>Min: {ratingRange.gte.toFixed(1)}</span>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={ratingRange.gte}
                        onChange={(e) => handleRatingChangeWithDebounce('gte', parseFloat(e.target.value))}
                        className={s.range}
                    />
                </div>
                <div className={s.ratingInput}>
                    <span>Max: {ratingRange.lte.toFixed(1)}</span>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={ratingRange.lte}
                        onChange={(e) => handleRatingChangeWithDebounce('lte', parseFloat(e.target.value))}
                        className={s.range}
                    />
                </div>
            </div>
        </div>
    );
};
