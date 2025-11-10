import s from './PageNotFound.module.css'
import {useNavigate} from "react-router";
import {Button} from "@/common/components/BackButton/Button.tsx";

export const PageNotFound = () => {
    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate('/')
    }

    return (
        <div className={s.container}>
            <h1 className={s.title}>404</h1>
            <h2 className={s.subtitle}>page not found</h2>
            <Button
                variant="primary"
                size="large"
                onClick={handleGoHome}
            >
                Return to Home Page
            </Button>
        </div>
    )
}
