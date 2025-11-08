import { useNavigate } from 'react-router';
import s from './BackButton.module.css';

export const BackButton = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); 
    };

    return (
        <button className={s.backButton} onClick={handleGoBack}>
            ← Back
        </button>
    );
};