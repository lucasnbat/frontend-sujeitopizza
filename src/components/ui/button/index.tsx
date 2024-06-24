import styles from './styles.module.scss';
import { ReactNode, ButtonHTMLAttributes } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    children: ReactNode; //o que tem dentro das tags do componente
}

export function Button({ loading, children, ...rest }: ButtonProps) {
    return (
        <button
            className={styles.button}
            disabled={loading}
            {...rest}
        >
            {loading ? (
                <FaSpinner color='#fff' size={24} />
            ) : (
                <a className={styles.buttonText}>
                    {children}
                </a>
            )}
        </button>
    );
}