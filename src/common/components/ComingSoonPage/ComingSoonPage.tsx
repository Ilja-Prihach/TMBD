import s from './ComingSoonPage.module.css';
import { useNavigate } from 'react-router';
import {Button} from "@/common/components/BackButton/Button.tsx";


interface ComingSoonPageProps {
  title?: string;
  description?: string;
}

export const ComingSoonPage = ({
  title = "Coming Soon",
  description = "This page is under development and will be available in the near future."
}: ComingSoonPageProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.icon}>🚧</div>
        <h1 className={s.title}>{title}</h1>
        <p className={s.description}>{description}</p>

        <div className={s.buttons}>
          <Button
            variant="outline"
            size="medium"
            onClick={handleGoBack}
          >
            ← Go Back
          </Button>
          <Button
            variant="primary"
            size="medium"
            onClick={handleGoHome}
          >
            🏠 Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};