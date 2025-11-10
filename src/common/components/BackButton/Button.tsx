import s from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

type ButtonProps = {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
};

export const Button = ({
                           children,
                           variant = 'primary',
                           size = 'medium',
                           onClick,
                           disabled = false,
                           type = 'button',
                           className = '',
                       }: ButtonProps) => {
    return (
        <button
            type={type}
            className={`${s.button} ${s[variant]} ${s[size]} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};