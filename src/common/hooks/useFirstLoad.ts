import { useState, useEffect } from 'react';

export const useFirstLoad = () => {
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    useEffect(() => {
        setIsFirstLoad(false);
    }, []);

    return isFirstLoad;
};