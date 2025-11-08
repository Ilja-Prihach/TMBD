import {useGlobalLoading} from "@/common/hooks/useGlobalLoading.ts";
import s from './GlobalLoader.module.css';

export const GlobalLoader = () => {
    const isLoading = useGlobalLoading();

    if (!isLoading) return null;

    return (
        <div className={s.overlay}>
            <div className={s.root}>
                <div className={`${s.bar} ${s.indeterminate1}`} />
                <div className={`${s.bar} ${s.indeterminate2}`} />
            </div>
        </div>
    );
};